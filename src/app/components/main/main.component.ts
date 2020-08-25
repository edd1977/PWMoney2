import { Component } from "@angular/core";
import { Observable, from } from "rxjs";
import { User } from "app/model/model";
import { AppState } from '../../redux/reducers';
import { Store, select } from "@ngrx/store";
import { selectCurrentUser } from '../../redux/selectors';

@Component({
    selector: 'main-componet',
    styleUrls: ['./main.component.css'],
    templateUrl: 'main.component.html'
})
export class MainComponent {
    
    currentUser$: Observable<User>;

    constructor(
        private store: Store<AppState>
    ) {
        this.currentUser$ = store.pipe(select(selectCurrentUser));
    }

    logOut() {
        let logout = confirm("Do you want to LogOut?");
        if(logout) {
            //this.appSvc.logOut();
        }
    }
}