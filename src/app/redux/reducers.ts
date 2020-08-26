import { User, Users, Transactions, Transaction } from '../model/model';
import { UserActions, USER_ACTIONS, LoginAction, LoadUsersAction, UsersActions, USERS_ACTIONS, TRANSACTION_ACTIONS, TransactionActions } from './actions';
import { IApp } from './classes';
import { act } from '@ngrx/effects';

const initialCurrentUserState = null;
const initialUsersState: Users = [];
const initialTransactionsState: Transactions = [];

export function transactionsReducer(state: Transactions = initialTransactionsState, action: TransactionActions) {
    let newState: Transactions = state;

    switch(action.type) {

        case TRANSACTION_ACTIONS.LOAD:
            newState = action.payload;
            break;

        case TRANSACTION_ACTIONS.CLEAR:
            newState = [];
            break;

    }

    return newState;
}

export function usersReducer(state: Users = initialUsersState, action: UsersActions) {
    let newState: Users = state; // default

    switch(action.type) {

        case USERS_ACTIONS.LOAD:
            newState = action.payload;
            break;

    }

    return newState;
}

export function currentUserReducer(state: User = initialCurrentUserState, action: UserActions): User {

    let newState: any = state; // default

    switch(action.type) {

        case USER_ACTIONS.LOGIN:
            newState =  (action as LoginAction).payload // просто замена текущего пользователя
            break;

        case USER_ACTIONS.LOGOUT:
            newState = null;
            // TODO effect для обнуления 
            break;

    }

    return newState;
} // userReducer()