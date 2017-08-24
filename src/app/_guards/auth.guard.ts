import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {User} from "../_models/user";
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }
    _user: User[] = [];
    userLogedin: boolean = false;
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            this._user = JSON.parse( localStorage.getItem('currentUser'));
            // logged in so return true
            this.userLogedin = true;
            return true;
        }

        // not logged in so redirect to login page with the return url
        this._user = [];
        this.userLogedin = false;
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}