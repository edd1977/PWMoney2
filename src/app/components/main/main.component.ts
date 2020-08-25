import { Component } from "@angular/core";
import { Observable, from } from "rxjs";
import { User } from "app/model/model";
import { IApp } from '../../redux/classes';
import { Store, select } from "@ngrx/store";
import { selectCurrentUser } from '../../redux/selectors';
import { LogoutAction } from "app/redux/actions";
import { UserService } from "app/services/user.service";

@Component({
    selector: 'main-componet',
    styleUrls: ['./main.component.css'],
    templateUrl: 'main.component.html'
})
export class MainComponent {
    
    currentUser$: Observable<User>;

    constructor(
        private store: Store<IApp>,
        private userSvc: UserService
    ) {
        this.currentUser$ = store.pipe(select(selectCurrentUser));
    }

    logOut() {
        this.userSvc.logoutUser();
    }
}