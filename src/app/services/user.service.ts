import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, from } from "rxjs";
import { map } from "rxjs/operators";
import { User, Users } from "app/model/model";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { selectCurrentUser, selectUsers } from "../redux/selectors";
import { LoginAction, LogoutAction, LoadUsersAction, UpdateUserAction } from "app/redux/actions";

@Injectable()
export class UserService {

    session_token = ""; // имитация получения маркера из запроса авторизации.

    currentUser: User; // для некоторых объектов, которые требуют статического значения.
    users: Users;

    constructor(
        private router: Router,
        private http: HttpClient,
        @Inject("BASE_URL") private baseUrl: string,
        private store: Store
    ) {
        this.store.select(selectCurrentUser).subscribe(user => this.currentUser = user);
        this.store.select(selectUsers).subscribe(users => this.users = users);
    }

    getUserByEmail(email: string): Observable<Users> {
        return this.http.get(this.baseUrl + "users/?email=" + email) as Observable<Users>
    }

    getUsers(): Observable<Users> {
        return this.http.get(this.baseUrl + "users") as Observable<Users>;
    }

    // Реализация ACTIONS:

    login(user: User) {
        this.session_token = "SUCCESS"; // обыгрывание реального маркера от сервера.
        //
        this.store.dispatch(new LoginAction(user));
        this.router.navigateByUrl('');
    }

    logoutUser() {
        let logout = confirm("Do you want to LogOut?");
        if(logout) {
            this.store.dispatch(new LogoutAction());
            this.session_token = ""; // сделать в будущем как effect.
            this.router.navigateByUrl('auth');
        }
    }

    loadUsers() {
        this.getUsers().subscribe((users) => {
            this.store.dispatch(new LoadUsersAction(users));
        });
    }

    registerUser(user: User) {
        this.http.post(this.baseUrl + "users", user)
        .subscribe((user: User) => {
            this.login(user);
        })
    }

    updateUser(user: User) {
        this.http.put(this.baseUrl + "users/id=" + user.id, user)
        .subscribe((user: User) => {
            this.store.dispatch(new UpdateUserAction(user));
        });
    }

}