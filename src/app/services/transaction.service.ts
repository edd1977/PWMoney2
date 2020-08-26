import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { User, Transaction } from "app/model/model";
import { selectCurrentUser } from '../redux/selectors';
import { LoadTransactionsAction } from "app/redux/actions";
import { forkJoin, Observable, of } from "rxjs";
import { tap, mergeMap } from "rxjs/operators";

@Injectable()
export class TransactionService {

    constructor(
        private router: Router,
        private http: HttpClient,
        @Inject("BASE_URL") private baseUrl: string,
        private store: Store
    ) { }

    getTransaction(user: User) {
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

    // Actions:

    loadTransactions() {
        this.store.select(selectCurrentUser).subscribe((user: User) => {
            this.getTransaction(user).subscribe((transactions) => {
                this.store.dispatch(new LoadTransactionsAction(transactions));
            });
        })
    }

}