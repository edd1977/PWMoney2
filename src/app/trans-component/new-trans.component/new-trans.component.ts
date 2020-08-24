import { Component, ViewChild, Injectable, Inject } from "@angular/core";
import { AppService } from "app/services/app.service";
import { NgForm, ValidatorFn, FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Transaction, Users, User } from "app/model/model";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { ErrorNotifyService } from "app/services/errorNotify.service";

@Injectable()
export class MyValidators {
    private static svc: AppService = null;

    constructor(private appSvc: AppService) {
        MyValidators.svc = appSvc;
        console.log('=============');
        console.log(appSvc);
    }

    static validateAmount(control: FormControl): {[s: string]: boolean} {
        const ctrlVal = Number.parseFloat(control.value);
        const result = (ctrlVal > 0 && ctrlVal <= MyValidators.svc.currentUser.balance) ?  null: {"amount": true};
        return result;
    }

    static validateName(control: FormControl): {[s: string]: boolean} {
        const ctrlVal = control.value;
        const result = MyValidators.svc.users.find(u => u.name === ctrlVal) != null? null: {"userName": true};
        return result;
    }
}

@Component({
    selector: 'new-trans',
    templateUrl: './new-trans.component.html',
    styleUrls: ['./new-trans.component.css']
})
export class NewTransComponent {

    formModel: FormGroup;

    data: any[] = [];
    
    constructor(private appSvc: AppService, private http: HttpClient, private amountVal: MyValidators,
        private route: ActivatedRoute, private router: Router,
        @Inject("ERROR_MESS") private error: Subject<string>
        ) {
        this.formModel = new FormGroup({
            name: new FormControl("", [Validators.required, MyValidators.validateName]),
            amount: new FormControl(1, [
                Validators.required, MyValidators.validateAmount
            ])
        });
    }

    ngOnInit() {
        const transId = this.route.snapshot.queryParams["transId"];
        if(transId) {
            const Id = Number.parseInt(transId);
            const trans = this.appSvc.transactions.find(t => t.id === Id);
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
                                errs.push(`Amount have to be from 1 to ${this.appSvc.currentUser.balance}.`);
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

        const way = 'not ' + 'static';

        const text = form.controls.name.value;
        // static approach:
        if(way === 'static') {
            this.data = this.appSvc.users.filter(u => u.name.indexOf(text) >= 0);
        } else {
            // dynamic approach:
            this.appSvc.getUsers(text).then(uu => {
                this.appSvc.users = uu as Users;
                this.data = uu as Users;
            })
            .catch(err => {
                this.error.next(`Autocomplete doesn't work: ${ErrorNotifyService.getHttpErrorMessage(err)}`);
            });
        }
    }

    submitTransaction(form: FormGroup) {
        const errors = [];
        if(form.valid) {
            this.appSvc.showWaitPanel = true;
            //
            this.appSvc.createTransaction(form.controls.name.value, Number.parseFloat(form.controls.amount.value))
            .then(response => {
                // We must add a new transaction:
                this.appSvc.addFixedTransactionToList(response["trans_token"] as Transaction);
                this.router.navigateByUrl("/user-info");
            })
            .catch(err => {
                this.error.next(`Transaction can't be done: ${ErrorNotifyService.getHttpErrorMessage(err)}`);
            })
            .finally(() => {
                this.appSvc.showWaitPanel = false;
            });
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