import { Injectable } from "@angular/core";
import { AppService } from "../services/app.service";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";


@Injectable()
export class AuthGuard {

    constructor(private appSvc: AppService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        if(typeof(this.appSvc.session_token) === "string" && this.appSvc.session_token.length > 0 ) {
            return true;
        }

        this.router.navigateByUrl('/auth');
        return false;
    }

}