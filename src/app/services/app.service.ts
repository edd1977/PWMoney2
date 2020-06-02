import { Injectable } from "@angular/core";
import { Users, User } from "./model";
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from "@angular/router";
import { Body } from "@angular/http/src/body";


@Injectable()
export class AppService {

    users: Users = [];
    currentUser: User = null;
    session_token: string = "";

    users_test: Users = []; // by cause of not understanding what is the "{filter}" in a request.

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
                this.users_test = uu as Users;
                return this; // AppService
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
            this.http.post(url, body, {headers: headers}).toPromise();
        }
    }

    createTransaction(name: string, amount: number): Promise<Object> {
        const url = 'http://localhost:3500/api/protected/transactions';
        const body = {
            name: name,
            amount: amount
        };
        const headers = new HttpHeaders().set('Authorization', 'bearer ' + this.session_token);
        return new Promise((res, rej) => {
            res({ status: 'TODO' });
        }); // this.http.post(url, body, { headers: headers }).toPromise();
    }

    logOut() {
        this.currentUser = null;
        this.users = [];
        this.users_test = [];
        this.session_token = "";
        this.router.navigateByUrl("/auth");
    }

}