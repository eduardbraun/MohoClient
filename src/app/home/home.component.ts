import { Component, OnInit } from '@angular/core';
import {trigger,state,style,animate,transition,keyframes} from '@angular/animations';
import { User } from '../_models/index';
import { UserService } from '../_services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.css'],
    animations:[
        trigger('navigation', [
            state('true' , style({ left:'-20%'})),
            state('false', style({ left:'0%'})),
            transition('0 => 1', animate('.2s')),
            transition('1 => 0', animate('.2s'))
        ]),
        trigger('showOverlay', [
            state('true' , style({ opacity: 1,display:"block" })),
            state('false', style({ opacity: 0,display:"none" })),
            transition('0 => 1', animate('.2s')),
            transition('1 => 0', animate('.5s'))
        ])
    ]
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];

    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    navigation:boolean = true;
    showOverlay:boolean = false;
    navigationDrawer(){
        this.navigation = !this.navigation;
        this.showOverlay = !this.showOverlay;
    }

    ngOnInit() {

    }
}