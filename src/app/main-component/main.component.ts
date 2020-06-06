import { Component } from "@angular/core";
import { User } from "app/services/model";
import { AppService } from "app/services/app.service";
import { Router } from "@angular/router";
import { MessageService } from "app/services/message.service";

@Component({
    selector: 'main-componet',
    styleUrls: ['./main.component.css'],
    templateUrl: 'main.component.html'
})
export class MainComponent {
    //currentUser: User = null;

    constructor(public appSvc: AppService, public messSvc: MessageService) {
        //this.currentUser = appSvc.currentUser;
    }

    logOut() {
        let logout = confirm("Do you want to LogOut?");
        if(logout) {
            this.appSvc.logOut();
        }
    }
}