import { Action } from '@ngrx/store';
import { User, Users, Transactions, Transaction } from '../model/model';

// *************************************************************

export namespace USER_ACTIONS {
    export const LOGIN: string = "LOGIN";
    export const LOGOUT: string = "LOGOUT";
    export const REGISTER: string = "REGISTER";
}

export class LoginAction implements Action {
    type: string = USER_ACTIONS.LOGIN;
    constructor(public payload: User) { }
}

export class LogoutAction implements Action {
    type: string = USER_ACTIONS.LOGOUT;
}

export class RegisterAction implements Action {
    type: string = USER_ACTIONS.REGISTER;
    constructor(public payload: User) { }
}

export type UserActions = LoginAction | LogoutAction | RegisterAction;

// *************************************************************

export namespace USERS_ACTIONS {
    export const LOAD: string = "LOAD_USERS";
    export const CLEAR: string = "CLEAR_USERS";
    export const UPDATE_USER: string = "UPDATE_USER"
}

export class LoadUsersAction implements Action {
    type: string = USERS_ACTIONS.LOAD;
    constructor(public payload: Users) { }
}

export class ClearUsersAction implements Action {
    type: string = USERS_ACTIONS.CLEAR;
}

export class UpdateUserAction implements Action {
    type: string = USERS_ACTIONS.UPDATE_USER;
    constructor(public payload: User) { }
}

export type UsersActions = LoadUsersAction | UpdateUserAction | ClearUsersAction;

// *************************************************************

export namespace TRANSACTION_ACTIONS {
    export const LOAD: string = "LOAD_TRANSACTIONS";
    export const CLEAR: string = "CLEAR_TRANSACTIONS";
    export const ADD: string = "ADD_NEW_TRANSACTION";
}

export class LoadTransactionsAction implements Action {
    type: string = TRANSACTION_ACTIONS.LOAD;
    constructor(public payload: Transactions) { }
}

export class ClearTransactionsAction implements Action {
    type: string = TRANSACTION_ACTIONS.CLEAR;
}

export class AddNewTransactionAction implements Action {
    type: string = TRANSACTION_ACTIONS.ADD;
    constructor(public payload: Transaction) { }
}

export type TransactionActions = LoadTransactionsAction | ClearTransactionsAction | AddNewTransactionAction;