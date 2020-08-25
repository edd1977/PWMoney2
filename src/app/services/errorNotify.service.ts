import { Subject } from "rxjs";

export type MessageSubject = Subject<Message>;

export class ErrorNotifyService {

    static notyfying: MessageSubject = new Subject<Message>();

    /**
     * Вспомогательная функция, которая в удобном виде предоставляет сообщения среды от HttpClient.
     * @param error 
     */
    static getHttpErrorMessage(error: any): string {
        let text = "";
        //
        if(typeof(error.error) == "object") {
            text = `(${error.status}) ${error.statusText}`;
        } else {
            text = `(${error.status}) ${error.error}`;
        }
        //
        return text;
    }

}

export enum MessageType {
    "Error",
    "Warning",
    "Notice"
}

export class Message {

    constructor(
        public message: string,
        public type: MessageType
    ) { }

}