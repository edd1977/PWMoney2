import { Component, Inject } from "@angular/core";
import { AppService } from "app/services/app.service";
import { MessageSubject, Message, MessageType } from '../../services/errorNotify.service';
import { NgForm } from "@angular/forms";
import { User, Users } from "app/model/model";
import { Router } from "@angular/router";
import { Subject, Observable } from "rxjs";
import { UserService } from "app/services/user.service";


@Component({
    selector: 'auth-component',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent {

    login_op: boolean = true;

    constructor(
        private userSvc: UserService,
        @Inject("ERROR_MESS") private messages: MessageSubject
    ) { }

    logIn(form: NgForm) {

        if(form.invalid) {
            return;
        }

        const controls = form.controls;

        this.userSvc.getUserByEmail(controls.email.value)
            .subscribe((users: Users) => {
                if(users.length > 0) {
                    if(users[0].password === controls.password.value) {
                        this.messages.next(new Message("Вы вошли в систему", MessageType.Notice));
                        setTimeout(() => {
                            this.userSvc.login(users[0]);
                        }, 1000);
                    } else {
                        this.messages.next(new Message("Ошибка при входе в систему", MessageType.Error));
                    }
                }
            });

        // this.appSvc.showWaitPanel = true;
        // //
        // this.appSvc.logIn(form.controls.email.value, form.controls.password.value)
        //     .then(response => {
        //         this.router.navigateByUrl('');
        //     })
        //     .catch(err => {
        //         this.errors.next(err);
        //     })
        //     .finally(() => {
        //         this.appSvc.showWaitPanel = false;
        //     });
    }

    addUser(form: NgForm) {
        // const user = Object.assign(new User(), {
        //     name: form.controls.name.value,
        //     email: form.controls.email.value
        // });

        // this.appSvc.showWaitPanel = true;
        // //
        // this.appSvc.addNewUser(user, form.controls.password.value).then(response => {
        //     console.log(response);
        // }).catch(err => {
        //     this.errors.next(`Can not register a new User: ${ErrorNotifyService.getHttpErrorMessage(err)}`);
        // })
        // .finally(() => {
        //     this.appSvc.showWaitPanel = false;
        // });
    }

}