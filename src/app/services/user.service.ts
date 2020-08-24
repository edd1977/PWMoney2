import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User, Users } from "app/model/model";

@Injectable()
export class UserService {

    constructor(
        private http: HttpClient,
        @Inject("BASE_URL") private baseUrl: string
    ) {}

    getUserByEmail(email: string): Observable<Users> {
        return this.http.get(this.baseUrl + "users/?email=" + email) as Observable<Users>
    }

    // Реализация ACTIONS:

    login(email: string) {
        // Login
        // 1. Отправляем get к /users?email=useremail
        this.getUserByEmail(email).subscribe((user: Users) => {
            console.log(user);
        });
    }

}