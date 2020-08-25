import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { UserService } from "app/services/user.service";
import { USERACTIONS, LoginAction, USERSACTIONS } from "./actions";
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
            ofType(USERACTIONS.LOGIN),
            switchMap((action: LoginAction) => {
                console.log(action);
                return this.userSvc.getUsers()
            }),
            mergeMap((users: Users) => { // mergeMap
                console.log(users);
                return [
                    {
                        type: USERSACTIONS.LOAD,
                        payload: users
                    }
                ]
            })
        )   


}