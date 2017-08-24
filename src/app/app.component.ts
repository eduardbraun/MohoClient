import {Component, OnInit} from '@angular/core';
import {User} from "./_models/user";
import '../assets/app.css';
import { AlertService, AuthenticationService } from './_services/index';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthGuard } from './_guards/index';

@Component({
    moduleId: module.id.toString(),
    selector: 'app',
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit{
    constructor(private authService : AuthGuard, private authenticationService: AuthenticationService,private router: Router,       private route: ActivatedRoute){}
    isLogedIn = false;
    returnUrl: string;
    _user: User[] = [];
    public firstname : string = "";
    public lastname : string = "";

    isActive(){
        return this.authService.userLogedin;
    }

    logout(){
        window.location.reload()
        this.authenticationService.logout();
    }
    ngOnInit(){
        this._user = this.authService._user;
    }
}