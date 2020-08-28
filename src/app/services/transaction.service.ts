import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { User, Transaction, Transactions } from "app/model/model";
import { selectCurrentUser } from '../redux/selectors';
import { LoadTransactionsAction } from "app/redux/actions";
import { forkJoin, Observable, of } from "rxjs";
import { tap, mergeMap } from "rxjs/operators";

@Injectable()
export class TransactionService {

    private _currentUser: User; // для хранения текущего пользователя внутри данных компонента.

    constructor(
        private router: Router,
        private http: HttpClient,
        @Inject("BASE_URL") private baseUrl: string,
        private store: Store
    ) {
        this.store.select(selectCurrentUser).subscribe(user => {this._currentUser = user})
    }

    getTransactions(user: User) {
        return forkJoin(
            this.http.get(this.baseUrl + "transactions?username=" + user.email),
            this.http.get(this.baseUrl + "transactions?recipient=" + user.email)
        ).pipe(
            mergeMap((objects: object[]) => {
                let transactions: Transaction[] = [];
                objects.forEach(arr => {
                    transactions = transactions.concat(arr as Transaction[]);
                });
                //
                return of(transactions); // возвращаем Observable
            })
        );
    }

    postNewTransaction(transaction: Transaction): Observable<Transaction> {
        return this.http.post(this.baseUrl + "transactions", transaction) as Observable<Transaction>;
    }

    // Actions:

    loadTransactions() {
        if(this._currentUser) {
            this.getTransactions(this._currentUser).subscribe((transactions: Transactions) => {
                this.store.dispatch(new LoadTransactionsAction(transactions));
            });
        }
    }

    addNewTransaction(transaction: Transaction) {
        this.postNewTransaction(transaction).subscribe(transaction => {
            // новое действие: UPDATE_USER_TRANSACTIONS - которому передается текущий пользователь и которая на эффектах перегружает транзакции.
            // Пользователя взять из username.
        })
    }

}