import { Component } from "@angular/core";
import { AppService } from "app/services/app.service";
import { Transactions } from "app/model/model";


@Component({
    selector: "trans-list",
    templateUrl: "./trans-list.component.html",
    styleUrls: ["./trans-list.component.css"]
})
export class TransListComponent {
    
    constructor(public appSvc: AppService) {
        //
    }

}