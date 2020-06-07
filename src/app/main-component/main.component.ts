import { Component } from "@angular/core";
import { AppService } from "app/services/app.service";

@Component({
    selector: 'main-componet',
    styleUrls: ['./main.component.css'],
    templateUrl: 'main.component.html'
})
export class MainComponent {
    
    constructor(public appSvc: AppService) {
    }

    logOut() {
        let logout = confirm("Do you want to LogOut?");
        if(logout) {
            this.appSvc.logOut();
        }
    }
}