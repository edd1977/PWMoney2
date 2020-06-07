import { Component, Inject } from '@angular/core';
import { AppService } from './services/app.service';
import { ErrorNotifyService } from './services/errorNotify.service';
import { Subscriber, Subject } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  errMess: string[] = [];
  showModal: boolean = true;

  get showWaitPanel(): boolean {
    return this.appSvc.showWaitPanel;
  }

  constructor(public appSvc: AppService,
      @Inject("ERROR_MESS") private errors: Subject<string>,
      private router: Router
    ) {
    errors.subscribe(err => {
      this.errMess.push(err);
      console.log(this.errMess);
    });
    router.events.subscribe(e => {
      if(e instanceof NavigationEnd) {
        this.errMess = [];
      }
    });
  }

  logOut() {
    let logout = confirm("Do you want to LogOut?");
    if(logout) {
        this.appSvc.logOut();
    }
  }

}
