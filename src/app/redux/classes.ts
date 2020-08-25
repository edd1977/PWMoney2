import { Transaction, Transactions, Users, User } from '../model/model';

export interface IApp {
    currentUser: User;
    users: Users;
    transactions: Transactions
}

export class AppState implements IApp {
    currentUser: User;
    users: Users;
    transactions: Transactions
}

