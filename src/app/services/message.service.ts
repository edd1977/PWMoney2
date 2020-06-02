import { Injectable } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";


@Injectable()
export class MessageService {

    messages: string[] = [];

    constructor(private router: Router) {
        router.events.subscribe(e => {
            if(e instanceof NavigationEnd) {
                this.messages = [];
            }
        });
    }

}