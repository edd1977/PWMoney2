import { Action } from '@ngrx/store';
import { User, Users, Transactions } from '../model/model';

// *************************************************************

export namespace USER_ACTIONS {
    export const LOGIN: string = "LOGIN";
    export const LOGOUT: string = "LOGOUT";
    export const REGISTER: string = "REGISTER";
}

export class LoginAction implements Action {
    type: string = USER_ACTIONS.LOGIN;

    constructor(public payload: User) { } // будем передавать связку email и password, введенные в форме.
}

export class LogoutAction implements Action {
    type: string = USER_ACTIONS.LOGOUT;
}

export type UserActions = LoginAction | LogoutAction;

// *************************************************************

export namespace USERS_ACTIONS {
    export const LOAD: string = "LOAD_USERS"
}

export class LoadUsersAction implements Action {
    type: string = USERS_ACTIONS.LOAD;

    constructor(public payload: Users) { }
}

export type UsersActions = LoadUsersAction;

// *************************************************************

export namespace TRANSACTION_ACTIONS {
    export const LOAD: string = "LOAD_TRANSACTIONS"
    export const CLEAR: string = "CLEAR_TRANSACTIONS"
}

export class LoadTransactionsAction implements Action {
    type: string = TRANSACTION_ACTIONS.LOAD;

    constructor(public payload: Transactions) { }
}

export class ClearTransactionsAction implements Action {
    type: string = TRANSACTION_ACTIONS.CLEAR;
}

export type TransactionActions = LoadTransactionsAction;