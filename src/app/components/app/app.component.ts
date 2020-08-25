import { Component, Inject } from '@angular/core';
import { AppService } from '../../services/app.service';
import { Subject } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from 'app/services/user.service';
import { MessageSubject } from 'app/services/errorNotify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  //errMess: string[] = [];
  showModal: boolean = true;

  get showWaitPanel(): boolean {
    return this.appSvc.showWaitPanel;
  }

  constructor(
      public appSvc: AppService, // пока оставим
      public userSvc: UserService,
      @Inject("ERROR_MESS") private errors: MessageSubject,
      //private router: Router
    ) {
    // errors.subscribe(err => {
    //   errors.next(err)
      //this.errMess //.push(err);
      //console.log(this.errMess);
    //});
    // router.events.subscribe(e => {
    //   if(e instanceof NavigationEnd) {
    //     this.errMess = [];
    //   }
    // });
  }

  logOut() {
    this.userSvc.logoutUser();
    // let logout = confirm("Do you want to LogOut?");
    // if(logout) {
    //     this.appSvc.logOut();
    // }
  }

}
