import { Injectable } from "@angular/core";
import { Actions, Effect, ofType, act } from '@ngrx/effects';
import { UserService } from "app/services/user.service";
import { USER_ACTIONS, LoginAction, USERS_ACTIONS, TRANSACTION_ACTIONS, LogoutAction } from "./actions";
import { map, switchMap, mergeMap } from "rxjs/operators";
import { Users, User, Transactions } from "app/model/model";
import { Observable, of } from "rxjs";
import { TransactionService } from "app/services/transaction.service";

@Injectable()
export class UserEffects {

    constructor(
        private actions$: Actions,
        private userSvc: UserService,
        private transSvc: TransactionService
    ) { }

    // LOGIN
    @Effect() getUsersAfterLogin = this.actions$
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
            ]
        })
    );   
    // LOGIN
    @Effect() getTransactionsAfterLogin = this.actions$
    .pipe(
        ofType(USER_ACTIONS.LOGIN),
        switchMap((action: LoginAction) => {
            return this.transSvc.getTransactions(action.payload)
        }),
        mergeMap((transactions: Transactions) => {
            return [
                {
                    type: TRANSACTION_ACTIONS.LOAD,
                    payload: transactions
                }
            ]
        })
    );
    // LOGOUT
    @Effect() clearDataAfterLogout = this.actions$
    .pipe(
        ofType(USER_ACTIONS.LOGOUT),
        mergeMap(action => {
            return [
                {
                    type: USERS_ACTIONS.CLEAR
                },
                {
                    type: TRANSACTION_ACTIONS.CLEAR
                }
            ]
        })
    );
    // REGISTER USER
    @Effect() loadUsersAfterRegester = this.actions$
    .pipe(
        ofType(USER_ACTIONS.REGISTER),
        switchMap(action => {
            return this.userSvc.getUsers()
        }),
        mergeMap((users: Users) => {
            return [
                {
                    type: USERS_ACTIONS.LOAD,
                    payload: users
                }
            ]
        })
    );

}