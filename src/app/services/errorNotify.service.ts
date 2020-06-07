import { Subject } from "rxjs";


export class ErrorNotifyService {

    static notyfying: Subject<string> = new Subject<string>();

    static getHttpErrorMessage(err: any): string {
        let mess = "";
        //
        if(typeof(err.error) == "object") {
            mess = `(${err.status}) ${err.statusText}`;
        } else {
            mess = `(${err.status}) ${err.error}`;
        }
        //
        return mess;
    }

}