import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, from } from "rxjs";
import { map } from "rxjs/operators";
import { User, Users } from "app/model/model";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { LoginAction } from "app/redux/actions";

@Injectable()
export class UserService {

    session_token = ""; // имитация получения маркера из запроса авторизации.

    constructor(
        private router: Router,
        private http: HttpClient,
        @Inject("BASE_URL") private baseUrl: string,
        private store: Store
    ) {}

    login(email: string): Observable<Users> {
        return this.http.get(this.baseUrl + "users/?email=" + email) as Observable<Users>
    }

    // Реализация ACTIONS:

    loginSuccess(user: User) {
        this.session_token = "SUCCESS";
        // action
        //this.store.dispatch(new LoginAction(user));
        setTimeout(() => {
            this.store.dispatch(new LoginAction(user));
        }, 2000);
        // переход на другой маршрут
        this.router.navigateByUrl('');
    }


}