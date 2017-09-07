import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ListingService} from "../_services/listing.service";
import {MdDialog} from "@angular/material";
import {AlertService} from "../_services/alert.service";
import {UserService} from "../_services/user.service";
import {Subscription} from 'rxjs';
import {AuthGuard} from "../_guards/auth.guard";


@Component({
    moduleId: module.id.toString(),
    templateUrl: 'user.component.html'
})

export class UserComponent {
    constructor(private route: ActivatedRoute, private userService : UserService,
                private listingService: ListingService, public dialog: MdDialog,
                private alertService: AlertService, private router: Router){
        this.route.params.subscribe( params =>{
            console.log(params);
            this.getProfileForUser(params['id'])
        });
    }

    data: any = {};
    lists: any = {};
    profile: any = {};
    reviews: any = {};
    busy: Subscription;

    openViewListingPage(listing: any){
        this.router.navigate(['listing', listing.userListingId]);
    }
    getProfileForUser(userId: string){
        this.busy = this.userService.getProfileByUserId(userId)
            .subscribe(
                listings => this.data = listings['profile'],
                error => this.alertService.error("An error occured loading the profile."),
                ()=>{
                    console.log('data', this.data);
                    this.lists = this.data['userListingCollectionDto'];
                    this.profile = this.data['userProfileDto'];
                    this.reviews = this.data['userProfileReviewList'];
                }
            )
    }
    model: any = {};

}