
export class User {

    constructor(
        public email: string,
        public password: string,
        public name?: string,
        public balance: number = 0
    ) {}

}

export type Users = User[];

export class Transaction {

    constructor(
        public username: string,
        public recipient: string,
        public date: Date,
        public amount: number,
        public balance: number,
        public id?: number
    ) {}
    
}

export type Transactions = Transaction[];