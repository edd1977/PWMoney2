import { Injectable } from "@angular/core";
import { Users, User, Transactions, Transaction } from "./model";
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router, NavigationEnd } from "@angular/router";
import { ErrorNotifyService } from "./errorNotify.service";


@Injectable()
export class AppService {

    users: Users = [];
    currentUser: User = null;
    session_token: string = "";
    transactions: Transactions = [];

    showWaitPanel: boolean = false;

    get authenticated(): boolean {
        return this.session_token.length > 0;
    }

    constructor(private http: HttpClient, private router: Router) {
        //
    }

    // Login:
    async logIn(name: string, pass: string): Promise<Object> {
        const url = "http://193.124.114.46:3001/sessions/create";
        const body = { "email": name, "password": pass };

        let result: any = null;

        try {
            result = await this.http.post(url, body).toPromise();
            this.session_token = result['id_token'];
        }
        catch(err) {
            return Promise.reject("Login failed: " + ErrorNotifyService.getHttpErrorMessage(err));
        }
        
        try {
            result = await this.getUserInfo();
            this.currentUser = Object.assign(new User(), result["user_info_token"]);
        } catch(err) {
            return Promise.reject("Getting User Info failed: " + ErrorNotifyService.getHttpErrorMessage(err));
        }

        try {
            result = await this.getUsers();
            this.users = result as Users;
        } catch(err) {
            return Promise.reject("Getting users List failed: " + ErrorNotifyService.getHttpErrorMessage(err));
        }

        try {
            result = await this.getTransactions();
            this.transactions = result["trans_token"] as Transactions;
        } catch(err) {
            return Promise.reject("Getting Transactions failed: " + ErrorNotifyService.getHttpErrorMessage(err));
        }

        return true;
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
            const body = { filter: filter || "" }; // I DON'T KNOW WHAT IS filter :(
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

    // Wait panel:
    

}