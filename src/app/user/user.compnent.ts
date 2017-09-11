import {Component, OnInit} from '@angular/core';
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

export class UserComponent implements OnInit {
    constructor(private route: ActivatedRoute, private userService: UserService,
                private listingService: ListingService, public dialog: MdDialog,
                private alertService: AlertService, private router: Router,
                private authGuard: AuthGuard) {
        this.route.params.subscribe(params => {
                console.log(params);
                this.userId = params['id'];
                this.getProfileForUser(params['id'])

                this.logedInUser = this.authGuard._user;
                console.log('user 1', this.userId);
                console.log('user 2', this.logedInUser.userId);
                if (this.logedInUser.userId == this.userId) {

                    console.log('sane profile');

                    this.isSameUser = true;
                }
            },
            error => this.alertService.error("Error loading profile"),
            () => {

            }
        );
    }

    ngOnInit() {

    }

    logedInUser: any = {};
    userId: string;
    data: any = {};
    lists: any = {};
    isSameUser = false;
    profile: any = {};
    reviews: any = {};
    busy: Subscription;
    reviewDescription: string;
    reviewTitle: string;
    starsCount: number;
    starsCounts: number[] = [];

    openViewListingPage(listing: any) {
        this.router.navigate(['listing', listing.userListingId]);
    }

    getProfileForUser(userId: string) {
        this.busy = this.userService.getProfileByUserId(userId)
            .subscribe(
                listings => this.data = listings['profile'],
                error => this.alertService.error("An error occured loading the profile."),
                () => {
                    console.log('data', this.data);
                    this.lists = this.data['userListingCollectionDto'];
                    this.profile = this.data['userProfileDto'];
                    this.reviews = this.data['userProfileReviewList'];


                }
            )
    }

    goToUser(userId: string){

    }
    model: any = {};

    saveReview() {
        if (this.authGuard.userLogedin) {
            if (this.reviewTitle == "" || this.reviewTitle == null) {
                this.alertService.error("Please leave a title for the review");
            }

            var review: any = {};

            review.ownerId = this.profile.userId;
            review.reviewTitle = this.reviewTitle;
            review.reviewDescription = this.reviewDescription;
            review.upVotePoints = this.starsCount;

            console.log('upvotes', this.starsCount);

            this.busy = this.userService.postReviewForUser(review)
                .subscribe(
                    listings => this.getProfileForUser(this.userId),
                    error => this.alertService.error("An error occurred while saving the review."),
                    () => {
                        this.alertService.success("Review Saved. Thank You!")
                    }
                )
        } else {
            this.alertService.error("Please LogIn or Register to write a review");
        }
    }
}