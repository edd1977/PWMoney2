import { Action } from '@ngrx/store';
import { User, Users } from '../model/model';

export namespace USERACTIONS {
    export const LOGIN: string = "LOGIN";
    export const LOGOUT: string = "LOGOUT";
    export const REGISTER: string = "REGISTER";
}

export class LoginAction implements Action {
    type: string = USERACTIONS.LOGIN;

    constructor(public payload: User) { } // будем передавать связку email и password, введенные в форме.
}

export type UserActions = LoginAction;