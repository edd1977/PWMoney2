import { Component, ViewChild, Injectable, Inject } from "@angular/core";
import { AppService } from "app/services/app.service";
import { NgForm, ValidatorFn, FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Transaction, Users, User, Transactions } from "app/model/model";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { ErrorNotifyService } from "app/services/errorNotify.service";
import { TransactionService } from "app/services/transaction.service";
import { UserService } from "app/services/user.service";

@Component({
    selector: 'new-trans',
    templateUrl: './new-trans.component.html',
    styleUrls: ['./new-trans.component.css']
})
export class NewTransComponent {

    formModel: FormGroup;

    data: any[] = [];
    
    getValidateAmount(userSvc) {
        return (control: FormControl): {[s: string]: boolean} => {
            const ctrlVal = Number.parseFloat(control.value);
            const result = (ctrlVal > 0 && ctrlVal <= userSvc.currentUser.balance) ?  null: {"amount": true};
            return result;
        }
    }
    getValidateName(userSvc) {
        return (control: FormControl): {[s: string]: boolean} => {
            const ctrlVal = control.value;
            const result = userSvc.users.find(u => u.name === ctrlVal) != null? null: {"userName": true};
            return result;
        }
    }

    validateAmount(control: FormControl): {[s: string]: boolean} {
        const ctrlVal = Number.parseFloat(control.value);
        const result = (ctrlVal > 0 && ctrlVal <= this.userSvc.currentUser.balance) ?  null: {"amount": true};
        return result;
    }
    //
    validateName(control: FormControl): {[s: string]: boolean} {
        const ctrlVal = control.value;
        const result = this.userSvc.users.find(u => u.name === ctrlVal) != null? null: {"userName": true};
        return result;
    }

    constructor(
        private userSvc: UserService,
        private transSvc: TransactionService,
        //private appSvc: AppService,
        //private http: HttpClient,
        //private amountVal: MyValidators,
        private route: ActivatedRoute,
        private router: Router,
        @Inject("ERROR_MESS") private error: Subject<string>
    ) { }

    ngOnInit() {

        this.formModel = new FormGroup({
            name: new FormControl("", [Validators.required, this.getValidateName(this.userSvc)]),
            amount: new FormControl(1, [
                Validators.required, this.getValidateAmount(this.userSvc)
            ])
        });

        const transId = this.route.snapshot.queryParams["transId"]; // операция копирования транзакции

        if(transId) {
            const Id = Number.parseInt(transId);
            const trans = this.transSvc.transactions.find(t => t.id === Id);
            if(trans) {
                this.formModel.controls.name.setValue(trans.username);
                this.formModel.controls.amount.setValue(trans.amount >= 0? trans.amount: -trans.amount);
            } else {
                this.error.next(`There is no transaction with Id "${Id}" in data base.`);
            }
        }
    }

    getValidationErrors(): string[] {
        let errs: string[] = [];
        //
        if(this.formModel) {
            for(let ctrlName in this.formModel.controls) {
                if(this.formModel.controls[ctrlName].invalid) {
                    for(let errName in this.formModel.controls[ctrlName].errors) {
                        switch(errName) {
                            case "required":
                                switch(ctrlName) {
                                    case "name":
                                        errs.push(`Please, enter a user name.`);
                                        break;
                                    case "amount":
                                        errs.push(`Please, enter an amount of PW.`);
                                        break;
                                }
                                break;
                            case "userName":
                                errs.push(`User name is not in the data base.`);
                                break;
                            case "amount":
                                errs.push(`Amount have to be from 1 to ${this.userSvc.currentUser.balance}.`);
                                break;
                        }
                    }    
                }
            }
        }

        //
        return errs;
    }

    onInputKeyUp(form: FormGroup) {
        const text = form.controls.name.value;
        this.data = this.userSvc.users.filter(u => u.name.indexOf(text) >= 0);
    }

    callbackAfterTransactionAdded(form: FormGroup) {
        form.controls.name.setValue("");
        form.controls.amount.setValue(0);
    }

    submitTransaction(form: FormGroup) {
        const errors = [];
        if(form.valid) {
            //this.appSvc.showWaitPanel = true;
            //

            const getCallback = (form: FormGroup) => {
                return () => {
                    this.callbackAfterTransactionAdded(form);
                }
            }

            this.transSvc.addNewTransaction(new Transaction(
                this.userSvc.currentUser.email,
                form.controls.name.value,
                new Date(Date.now()),
                Number.parseFloat(form.controls.amount.value),
                this.userSvc.currentUser.balance
                ),
                getCallback(form)
            );

            // this.appSvc.createTransaction(form.controls.name.value, Number.parseFloat(form.controls.amount.value))
            // .then(response => {
            //     // We must add a new transaction:
            //     this.appSvc.addFixedTransactionToList(response["trans_token"] as Transaction);
            //     this.router.navigateByUrl("/user-info");
            // })
            // .catch(err => {
            //     this.error.next(`Transaction can't be done: ${ErrorNotifyService.getHttpErrorMessage(err)}`);
            // })
            // .finally(() => {
            //     this.appSvc.showWaitPanel = false;
            // });
            // go to the list of transactions.
        } else {
            for(let key in form.controls) {
                if(form.controls[key].invalid) {
                    this.error.next(`Form is not filled properly.`);
                }
            }
        }
    }
}