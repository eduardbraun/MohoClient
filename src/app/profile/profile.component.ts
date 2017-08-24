import { Component, OnInit } from '@angular/core';
import {trigger,state,style,animate,transition,keyframes} from '@angular/animations';
import { User } from '../_models/index';
import { UserService } from '../_services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'profile.component.html',
})

export class ProfileComponent implements OnInit {

    ngOnInit() {

    }
}