import { Component } from '@angular/core';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(public appSvc: AppService) {
    //
  }

  logOut() {
    let logout = confirm("Do you want to LogOut?");
    if(logout) {
        this.appSvc.logOut();
    }
  }

}
