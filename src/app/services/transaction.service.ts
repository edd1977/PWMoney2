import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { User, Transaction, Transactions, Users } from "app/model/model";
import { selectCurrentUser, selectUsers, selectTransactions } from '../redux/selectors';
import { LoadTransactionsAction, AddNewTransactionAction } from "app/redux/actions";
import { forkJoin, Observable, of } from "rxjs";
import { tap, mergeMap, switchMap, map } from "rxjs/operators";
import { UserService } from "./user.service";

@Injectable()
export class TransactionService {

    transactions: Transactions;

    constructor(
        private userSvc: UserService,
        private router: Router,
        private http: HttpClient,
        @Inject("BASE_URL") private baseUrl: string,
        private store: Store
    ) {
        this.store.select(selectTransactions).subscribe(transactions => this.transactions = transactions);
    }

    getTransactionsByName(userName: string): Observable<Transactions> {
        return this.store.select(selectUsers).pipe(
            map((users: Users) => {
                const _users = users.filter(u => u.email === userName);
                return _users.length > 0? _users[0]: null;
            }),
            switchMap((user: User) => {
                return this.getTransactions(user);
            })
        )
    }

    getTransactions(user: User): Observable<Transactions> {
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
        if(this.userSvc.currentUser) {
            this.getTransactions(this.userSvc.currentUser).subscribe((transactions: Transactions) => {
                this.store.dispatch(new LoadTransactionsAction(transactions));
            });
        }
    }

    addNewTransaction(transaction: Transaction, callback: () => void) {
        this.postNewTransaction(transaction).subscribe(transaction => {
            this.store.dispatch(new AddNewTransactionAction(transaction));
        })
    }

}