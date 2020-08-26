import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { UserService } from "app/services/user.service";
import { USER_ACTIONS, LoginAction, USERS_ACTIONS, TRANSACTION_ACTIONS } from "./actions";
import { map, switchMap, mergeMap } from "rxjs/operators";
import { Users, User } from "app/model/model";
import { Observable, of } from "rxjs";

@Injectable()
export class UserEffects {

    constructor(
        private actions$: Actions,
        private userSvc: UserService
    ) { }

    @Effect() login = this.actions$
        .pipe(
            ofType(USER_ACTIONS.LOGIN),
            switchMap((action: LoginAction) => {
                return this.userSvc.getUsers()
            }),
            mergeMap((users: Users) => {
                return [
                    {
                        type: USERS_ACTIONS.LOAD,
                        payload: users
                    }
                    //,
                    // {
                    //     type: TRANSACTION_ACTIONS.LOAD
                    // }
                ]
            })
        )   


}