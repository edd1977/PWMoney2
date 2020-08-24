import { User, Users } from '../model/model';
import { UserActions, LoginAction, USERACTIONS } from './actions';

const initialState = {
    currentUser: null,
    users: [],
    transactions: []
}

export function userReducer(state = initialState, action: UserActions) {
    switch(action.type) {

        case USERACTIONS.LOGIN:
            return {
                ...state,
                currentUser: action.payload // просто замена текущего пользователя
            }


        // если никакие действия не подошли:
        default:
            return state;
    }
}