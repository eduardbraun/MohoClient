import {Component, Input, OnInit} from '@angular/core';
import {Listing} from "../_models/listing";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {HttpClient, HttpResponse, HttpHeaders} from "@angular/common/http";
import {ListingService} from "../_services/listing.service";
import {MdDialog, MdDialogRef} from "@angular/material";
import {error} from "util";
import {_finally} from "rxjs/operator/finally";
import {Subscription} from "rxjs/Subscription";

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'profile.component.html',
})

export class ProfileComponent implements OnInit {
    constructor(private listingService: ListingService, public dialog: MdDialog) {

    }

    busy: Subscription;
    busy2: Subscription;
    results: any = {};
    errorMessage: string;
    lists: any;
    token: any = {};

    ngOnInit() {
        this.getAllListingsForUser()
    }

    openAddListingDialog() {
        let dialogRef = this.dialog.open(AddListingDialog, {
            width: '60%'
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.results = result;
                this.token = JSON.parse(localStorage.getItem('currentUser'));
                this.busy2 = this.listingService.createNewListing(result)
                    .subscribe(
                        listings => this.lists = listings[''],
                        error => this.errorMessage = error,
                        () => this.getAllListingsForUser()
                    )
            } else {
                //user clicked canceled
            }

        });
    }

    openUpdateListingDialog(listing: any) {
        let updateList = listing;
        if (updateList != null) {
            let dialogRef = this.dialog.open(UpdateListingDialog, {
                width: '60%'
            });

            dialogRef.componentInstance.updatedListing = updateList;
            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this.results = result;
                    this.busy = this.listingService.updateListing(result)
                        .subscribe(
                            listings => this.lists = listings[''],
                            error => this.errorMessage = error,
                            () => this.getAllListingsForUser()
                        )
                } else {
                    //user clicked canceled
                }

            });
        }
    }

    getAllListingsForUser() {
        this.busy = this.listingService.getListingsForUser()
            .subscribe(
                listings => this.lists = listings['listingsCollection'],
                error => this.errorMessage = error
            )
    }
}

@Component({
    selector: 'addListing.component',
    templateUrl: '../profile/addListing.component.html',
})
export class AddListingDialog {
    constructor(public dialogRef: MdDialogRef<AddListingDialog>) {
    }

    newListing: any = {};

    countries = [
        {id: 1, name: "United States"},
        {id: 2, name: "Australia"},
        {id: 3, name: "Canada"},
        {id: 4, name: "Brazil"},
        {id: 5, name: "England"}
    ];

    province = [
        {id: 1, name: "Manitoba"},
        {id: 2, name: "Saskatchewan"},
        {id: 3, name: "Alberta"},
        {id: 4, name: "British Culumbian"},
        {id: 5, name: "Other"}
    ];

    city = [
        {id: 1, name: "Winkler"},
        {id: 2, name: "Morden"},
        {id: 3, name: "Altona"},
        {id: 4, name: "Brandon"},
        {id: 5, name: "Winnipeg"}
    ];

    listingType = [
        {id: 1, name: "Car"},
        {id: 2, name: "Home"},
        {id: 3, name: "Garden"},
        {id: 4, name: "Renovation"},
        {id: 5, name: "Other"}
    ];


    saveDialog() {
        this.dialogRef.close(this.newListing);
    }
}

@Component({
    selector: 'addListing.component',
    templateUrl: '../profile/updateListing.component.html',
})
export class UpdateListingDialog implements OnInit {

    @Input() updatedListing: any = {};
    listing: any;

    constructor(public dialogRef: MdDialogRef<UpdateListingDialog>) {
    }

    UpdateListingViewModel = function (listing: any) {
        this.UserListingId = listing.userListingId;
        this.OwnerId = listing.ownerId;
        this.ListingType = listing.listingType;
        this.ListingCountry = listing.country;
        this.ListingProvince = listing.province;
        this.ListingCity = listing.city;
        this.ListingTitle = listing.listingTitle;
        this.Email = listing.email;
        this.ListingDescription = listing.listingDescription;
        this.Address = listing.address;
        this.PhoneNumber = listing.phoneNumber;
        this.FullName = listing.fullName;

    };

    ngOnInit(): void {
        this.listing = new this.UpdateListingViewModel(this.updatedListing);
        console.log('userId is:', JSON.stringify(this.listing));
    }

    countries = [
        "United States", "Australia", "Canada", "Brazil", "England", "Other"
    ];

    province = ["Manitoba", "Saskatchewan", "Alberta", "British Culumbian", "Other"
    ];

    city = ["Winkler", "Morden", "Altona", "Brandon", "Winnipeg", "Other"
    ];

    listingType = [ "Cars and Trucks", "Home","Garden", "House work/renovation", "Other"
    ];


    saveDialog() {
        this.dialogRef.close(this.listing);
    }
}