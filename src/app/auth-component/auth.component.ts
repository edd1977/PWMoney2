import { Component } from "@angular/core";
import { AppService } from "app/services/app.service";
import { NgForm } from "@angular/forms";
import { User } from "app/services/model";
import { Router } from "@angular/router";


@Component({
    selector: 'auth-component',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent {

    constructor(private appSvc: AppService, private router: Router) {
        //
    }

    logIn(form: NgForm) {
        // test: mai_den@mail.ru #test_task
        this.appSvc.logIn(form.controls.email.value, form.controls.password.value)
            .then(response => {
                if(response.hasOwnProperty("id_token")) { // If OK - get user info.
                    this.appSvc.getUserInfo().then(response => {
                        this.appSvc.currentUser = Object.assign(new User(), response["user_info_token"]);
                        this.router.navigateByUrl('');
                    }).catch(err => {
                        alert("Error during the getting user-info:\n" + JSON.stringify(err));
                    });
                } else { // error
                    alert("Error during the LogIn:\n" + JSON.stringify(response));
                }
            });
    }

    addUser(form: NgForm) {
        const user = Object.assign(new User(), {
            name: form.controls.name.value,
            email: form.controls.email.value
        });
        this.appSvc.addNewUser(user, form.controls.password.value).then(response => {
            console.log(response);
        }).catch(err => {
            console.error(err);
        });
    }

}