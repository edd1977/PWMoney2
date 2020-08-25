import { User, Users, Transactions, Transaction } from '../model/model';
import { UserActions, USERACTIONS, LoginAction, LoadUsersAction, UsersActions, USERSACTIONS } from './actions';
import { IApp } from './classes';

const initialCurrentUserState = null;
const initialUsersState: Users = [];
const initialTransactionsState: Transactions = [];

export function transactionsReducer(state: Transactions = initialTransactionsState, action: UserActions) {
    let newState: Transactions = state;

    switch(action.type) {

        case USERACTIONS.LOGIN:
            
            break;

    }

    return newState;
}

export function usersReducer(state: Users = initialUsersState, action: UsersActions) {
    let newState: Users = state; // default

    switch(action.type) {

        case USERSACTIONS.LOAD:
            newState = action.payload;
            break;

    }

    return newState;
}

export function currentUserReducer(state: User = initialCurrentUserState, action: UserActions): User {

    let newState: any = state; // default

    switch(action.type) {

        case USERACTIONS.LOGIN:
            newState =  (action as LoginAction).payload // просто замена текущего пользователя
            break;

        case USERACTIONS.LOGOUT:
            newState = null;
            // TODO effect для обнуления 
            break;

    }

    return newState;
} // userReducer()