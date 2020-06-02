import { Component, ViewChild, Injectable } from "@angular/core";
import { AppService } from "app/services/app.service";
import { NgForm, ValidatorFn, FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { MessageService } from "app/services/message.service";
import { IfObservable } from "rxjs/observable/IfObservable";

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
        const result = MyValidators.svc.users_test.find(u => u.name === ctrlVal) != null? null: {"userName": true};
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
    recipient: any = null;

    constructor(private appSvc: AppService, private http: HttpClient, private amountVal: MyValidators
        , private messSvc: MessageService) {
        this.formModel = new FormGroup({
            name: new FormControl("", [Validators.required, MyValidators.validateName]),
            amount: new FormControl(1, [
                Validators.required, MyValidators.validateAmount
            ])
        });
    }

    onInputKeyUp(form: NgForm) {

        const way = 'not ' + 'static';

        this.recipient = null; // while typing - there is no any choice.
        const text = form.controls.name.value;
        // static approach:
        if(way === 'static') {
            this.data = this.appSvc.users_test.filter(u => u.name.indexOf(text) >= 0);
        } else {
            // dynamic approach:
            this.appSvc.getUsers(text).then(uu => {
                this.data = uu as any[];
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
                console.log(response);
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