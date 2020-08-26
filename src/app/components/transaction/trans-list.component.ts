import { Component } from "@angular/core";
import { AppService } from "app/services/app.service";
import { Transactions } from "app/model/model";
import { TransactionService } from "app/services/transaction.service";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { selectTransactions } from "../../redux/selectors";


@Component({
    selector: "trans-list",
    templateUrl: "./trans-list.component.html",
    styleUrls: ["./trans-list.component.css"]
})
export class TransListComponent {
    
    transactions$: Observable<Transactions>;

    constructor(
        public appSvc: AppService,
        private transSvc: TransactionService,
        private store: Store<{ transactions: Transactions }>
    ) {
        this.transactions$ = store.select(selectTransactions);
    }

    clickText() {
        this.transSvc.loadTransactions();
    }

}