import { Component, Inject } from "@angular/core";
import { MessageSubject, Message, MessageType } from '../../services/errorNotify.service';
import { Router, NavigationEnd } from "@angular/router";

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.css']
})
export class AppMessageComponent {

    MessageTypeClass = MessageType;

    messageType: MessageType;
    message: string;

    constructor(
        @Inject("ERROR_MESS") private messages: MessageSubject,
        private router: Router
    ) {
        messages.subscribe((message: Message) => {
            this.message = message.message;
            this.messageType = message.type;
        });

        router.events.subscribe(event => {
            if(event instanceof NavigationEnd) {
                this.message = "";
            }
        });
    }

}