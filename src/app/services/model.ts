
export class User {
    id: number;
    name: string;
    email: string;
    balance: number;
}

export type Users = User[];

export class Transaction {
    id: number;
    date: Date;
    username: string;
    amount: number;
    balance: number;
}

export type Transactions = Transaction[];