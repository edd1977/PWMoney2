import { Injectable } from "@angular/core";
import { Users, User, Transactions, Transaction } from "./model";
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from "@angular/router";


@Injectable()
export class AppService {

    users: Users = [];
    currentUser: User = null;
    session_token: string = "";
    transactions: Transactions = [];

    get authenticated(): boolean {
        return this.session_token.length > 0;
    }

    constructor(private http: HttpClient, private router: Router) {
        //
    }

    // Login:
    logIn(name: string, pass: string): Promise<Object> {
        const url = "http://193.124.114.46:3001/sessions/create";
        const body = { "email": name, "password": pass };
        return this.http.post(url, body).toPromise() // authorization:
            .then(response => {
                this.session_token = response['id_token'];
                console.log('Authentication is passed successfully!');
                //
                return this.getUserInfo(); //.then(ui => {
            })
            .then(ui => { // getting user info
                this.currentUser = Object.assign(new User(), ui["user_info_token"]);
                return this.getUsers();
            })
            .then(uu => { // getting all users
                this.users = uu as Users;
                //this.users_test = uu as Users;
                return this.getTransactions(); // AppService
            }).then(tt => {
                this.transactions = tt["trans_token"] as Transactions;
                return true;
            });
    }

    getUserInfo(): Promise<Object> {
        const url = "http://193.124.114.46:3001/api/protected/user-info";
        const headers = (new HttpHeaders()).set('Authorization', 'bearer ' + this.session_token);
        return this.http.get(url, {headers: headers}).toPromise();
    }

    // Add new user:
    addNewUser(user: User, pass: string): Promise<Object> {
        const url = "http://193.124.114.46:3001/users";
        const body = {
            username: user.name,
            email: user.email,
            password: pass
        };
        return this.http.post(url, body).toPromise();
    }

    getUsers(filter = null): Promise<Object> {
        // filter - a part of an user name.
        const jsonServer = true; // for test
        let url = "";
        if(jsonServer) {
            // json-server:
            url = `http://localhost:3500/users${filter? "?q=" + filter: ""}`;
            return this.http.get(url, {}).toPromise();
        } else {
            // normal:
            url = `http://193.124.114.46:3001/api/protected/users/list`;
            const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.session_token);
            const body = { filter: filter || "" };
            return this.http.post(url, body, {headers: headers}).toPromise();
        }
    }

    createTransaction(name: string, amount: number): Promise<Object> {
        const url = 'http://193.124.114.46:3001/api/protected/transactions';
        const body = {
            name: name,
            amount: amount
        };
        const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.session_token);
        return this.http.post(url, body, { headers: headers }).toPromise();
    }

    getTransactions(): Promise<Object> {
        const url = 'http://193.124.114.46:3001/api/protected/transactions';
        const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.session_token);
        return this.http.get(url, { headers: headers }).toPromise();
    }

    addFixedTransactionToList(t: Transaction) {
        this.transactions.push(t);
    }

    logOut() {
        this.currentUser = null;
        this.users = [];
        //this.users_test = [];
        this.session_token = "";
        this.router.navigateByUrl("/auth");
    }

}