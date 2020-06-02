import { Component, ViewChild, Injectable } from "@angular/core";
import { AppService } from "app/services/app.service";
import { NgForm, ValidatorFn, FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AmountValidator {
    private static svc: AppService = null;

    constructor(private appSvc: AppService) {
        AmountValidator.svc = appSvc;
        console.log('=============');
        console.log(appSvc);
    }

    static validateAmount(control: FormControl): {[s: string]: boolean} {
        const ctrlVal = Number.parseFloat(control.value);
        return (ctrlVal > 0 && ctrlVal <= AmountValidator.svc.currentUser.balance) ? {"amount": true} : null;
    }
}

@Component({
    selector: 'new-trans',
    templateUrl: './new-trans.component.html',
    styleUrls: ['./new-trans.component.css']
})
export class NewTransComponent {

    form2: FormGroup;

    data: any[] = [];
    recipient: any = null;

    constructor(private appSvc: AppService, private http: HttpClient, private amountVal: AmountValidator) {
        this.form2 = new FormGroup({
            name: new FormControl("", Validators.required),
            amount: new FormControl(1, [
                Validators.required, AmountValidator.validateAmount
            ])
        });
    }

    onInputKeyUp(form: NgForm) {
        this.recipient = null; // while typing - there is no any choice.
        const text = form.controls.name.value;
        // prepare data:
        const url = `http://localhost:3500/users?q=${text}`;
        //const headers = (new HttpHeaders()).set('Authorization', 'bearer ' + this.session_token);
        return this.http.get(url, {}).toPromise().then(data => {
            this.data = data as any[];
        });
    }

    seeForm() {
        console.log(this.form2);
    }
}