import { Component } from "@angular/core";
import { User } from "app/services/model";
import { AppService } from "app/services/app.service";
import { Router } from "@angular/router";

@Component({
    selector: 'main-componet',
    styleUrls: ['./main.component.css'],
    templateUrl: 'main.component.html'
})
export class MainComponent {
    currentUser: User = null;

    constructor(private appSvc: AppService) {
        this.currentUser = appSvc.currentUser;
    }

    logOut() {
        this.appSvc.logOut();
    }
}