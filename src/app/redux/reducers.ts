import { User, Users, Transactions } from '../model/model';
import { UserActions, USERACTIONS } from './actions';

const initialState = {
    currentUser: null,
    users: [],
    transactions: []
}

export class AppState {
    currentUser: User;
    users: Users;
    transactions: Transactions
}

export function userReducer(state: AppState = initialState, action: UserActions): AppState {

    let newState: any = state; // default

    switch(action.type) {

        case USERACTIONS.LOGIN:
            newState = {
                ...state,
                currentUser: action.payload // просто замена текущего пользователя
            }
            break;

    }

    console.log("userReducer() =>");
    console.log(newState);
    return newState;
}