import { Component } from "@angular/core";
import { AppService } from "app/services/app.service";
import { NgForm } from "@angular/forms";
import { HttpClient } from "@angular/common/http";


@Component({
    selector: 'new-trans',
    templateUrl: './new-trans.component.html',
    styleUrls: ['./new-trans.component.css']
})
export class NewTransComponent {

    data: any[] = [];
    recipient: any = null;

    constructor(private appSvc: AppService, private http: HttpClient) {
        //
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
}