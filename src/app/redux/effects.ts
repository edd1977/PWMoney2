import { Injectable } from "@angular/core";
import { Actions, Effect, ofType, act } from '@ngrx/effects';
import { UserService } from "app/services/user.service";
import { USER_ACTIONS, LoginAction, USERS_ACTIONS, TRANSACTION_ACTIONS, LogoutAction, AddNewTransactionAction } from "./actions";
import { map, switchMap, mergeMap } from "rxjs/operators";
import { Users, User, Transactions, Transaction } from "app/model/model";
import { Observable, of, forkJoin } from "rxjs";
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
                },
                { // у нового пользователя не может быть транзакций.
                    type: TRANSACTION_ACTIONS.CLEAR
                }
            ]
        })
    );
    // ADD NEW TRANSACTION
    @Effect() loadTransactionsAfterAddingNew = this.actions$
    .pipe(
        ofType(TRANSACTION_ACTIONS.ADD),
        switchMap(action => {
            return this.transSvc.getTransactionsByName( (action as AddNewTransactionAction).payload.username);
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
    @Effect() updateUsersAfterAddingNew = this.actions$
    .pipe(
        ofType(TRANSACTION_ACTIONS.ADD),
        switchMap((action: AddNewTransactionAction) => {
            const trans = (action.payload as Transaction);
            // редактирование данных участвующих в транзакции пользователей:
            const u1 = {
                ...this.userSvc.users.find(u => u.email === trans.username)
            };
            const u2 = {
                ...this.userSvc.users.find(u => u.email === trans.recipient)
            };
            u1.balance -= trans.amount;
            u2.balance += trans.amount;
            // запись данных в БД:
            return forkJoin([
                this.userSvc.updateUser(u1),
                this.userSvc.updateUser(u2)
            ])
        }),
        mergeMap(data => {
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

// { dispatch: false } - это если не нужно генерировать никаких действий, а нужен только эффект!