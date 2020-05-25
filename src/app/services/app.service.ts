import { Injectable } from "@angular/core";
import { Users, User } from "./model";
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from "@angular/router";


@Injectable()
export class AppService {

    users: Users = [];
    currentUser: User = null;
    session_token: string = "";

    constructor(private http: HttpClient, private router: Router) {
        //
    }

    // Add new user:

    // Login:
    logIn(name: string, pass: string): Promise<Object> {
        const url = "http://193.124.114.46:3001/sessions/create";
        const body = { "email": name, "password": pass };
        return this.http.post(url, body).toPromise()
            .then(response => {
                this.session_token = response['id_token'];
                console.log('Authentication is passed successfully!');
                return response;
            })
            .catch(err => {
                console.error(err);
                return err;
            });
    }

    getUserInfo(): Promise<Object> {
        const url = "http://193.124.114.46:3001/api/protected/user-info";
        const headers = (new HttpHeaders()).set('Authorization', 'bearer ' + this.session_token);
        return this.http.get(url, {headers: headers}).toPromise();
    }

    addNewUser(user: User, pass: string): Promise<Object> {
        const url = "http://193.124.114.46:3001/users";
        const body = {
            username: user.name,
            email: user.email,
            password: pass
        };
        return this.http.post(url, body).toPromise();
    }

    logOut() {
        this.currentUser = null;
        this.session_token = "";
        this.router.navigateByUrl("/auth");
    }

}