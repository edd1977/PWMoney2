import { Component, ViewChild, Injectable } from "@angular/core";
import { AppService } from "app/services/app.service";
import { NgForm, ValidatorFn, FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { MessageService } from "app/services/message.service";
import { Transaction, Users, User } from "app/services/model";
import { ActivatedRoute } from "@angular/router";

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

    constructor(private appSvc: AppService, private http: HttpClient, private amountVal: MyValidators
        , private messSvc: MessageService,
        private route: ActivatedRoute) {
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
                console.error("There is no transaction with Id = " + Id);
            }
        }
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
                console.error(err);
            });
        }
    }

    submitTransaction(form: FormGroup) {
        const errors = [];
        if(form.valid) {
            this.appSvc.createTransaction(form.controls.name.value, Number.parseFloat(form.controls.amount.value))
            .then(response => {
                // We must add a new transaction:
                this.appSvc.addFixedTransactionToList(response["trans_token"] as Transaction);
            })
            .catch(err => {
                console.error(err);
                
            });
            // go to the list of transactions.
        } else {
            for(let key in form.controls) {
                if(form.controls[key].invalid) {
                    errors.push('Error!');
                }
            }
        }
        this.messSvc.messages = errors;
    }
}