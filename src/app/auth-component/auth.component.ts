import { Component, Inject } from "@angular/core";
import { AppService } from "app/services/app.service";
import { NgForm } from "@angular/forms";
import { User } from "app/services/model";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { ErrorNotifyService } from "app/services/errorNotify.service";


@Component({
    selector: 'auth-component',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent {

    login_op: boolean = true;

    constructor(private appSvc: AppService, private router: Router,
        @Inject("ERROR_MESS") private errors: Subject<string> ) {
        //
    }

    logIn(form: NgForm) {
        this.appSvc.showWaitPanel = true;
        //
        this.appSvc.logIn(form.controls.email.value, form.controls.password.value)
            .then(response => {
                this.router.navigateByUrl('');
            })
            .catch(err => {
                this.errors.next(err);
            })
            .finally(() => {
                this.appSvc.showWaitPanel = false;
            });
    }

    addUser(form: NgForm) {
        const user = Object.assign(new User(), {
            name: form.controls.name.value,
            email: form.controls.email.value
        });

        this.appSvc.showWaitPanel = true;
        //
        this.appSvc.addNewUser(user, form.controls.password.value).then(response => {
            console.log(response);
        }).catch(err => {
            this.errors.next(`Can not register a new User: ${ErrorNotifyService.getHttpErrorMessage(err)}`);
        })
        .finally(() => {
            this.appSvc.showWaitPanel = false;
        });
    }

}