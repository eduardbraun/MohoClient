﻿import {Component, OnInit} from '@angular/core';
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
    constructor(private authService : AuthGuard, private authenticationService: AuthenticationService,private router: Router,
                private route: ActivatedRoute){
        authenticationService.getUserInfo.subscribe(   userInfo => this.changeUserInfo(userInfo));
    }
    _user: any = {};

    logout(){
        window.location.reload();
        this.authenticationService.logout();
    }
    ngOnInit(){
        this._user = JSON.parse(localStorage.getItem('currentUser'));
    }

    private changeUserInfo(userInfo : any): void {
        this._user = userInfo;
    }
}