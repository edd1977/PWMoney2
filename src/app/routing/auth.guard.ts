import { Injectable } from "@angular/core";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { UserService } from "app/services/user.service";


@Injectable()
export class AuthGuard {

    constructor(private userSvc: UserService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        if(typeof(this.userSvc.session_token) === "string" && this.userSvc.session_token.length > 0 ) {
            return true;
        }

        this.router.navigateByUrl('/auth');
        return false;
    }

}