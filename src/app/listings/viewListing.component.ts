import { Component, OnInit } from '@angular/core';
import {MdButtonModule, MdDialog, MdDialogRef} from '@angular/material';
import {Listing} from "../_models/listing";
import {Pipe, PipeTransform} from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {HttpClient, HttpResponse, HttpHeaders} from "@angular/common/http";
import {ListingService} from "../_services/listing.service";
import {Subscription} from "rxjs/Subscription";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../_services/alert.service";
import {AuthGuard} from "../_guards/auth.guard";

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'viewListing.component.html',
})
export class ViewListingComponent implements OnInit {
    constructor(private route: ActivatedRoute, private authGuard: AuthGuard, private listingService: ListingService, public dialog: MdDialog, private alertService: AlertService){
        this.route.params.subscribe( params =>{
            console.log(params);
            this.getListingForId(params['id']);
            this.listingId = params['id'];

        });
    }

    busy: Subscription;
    list : any = {};
    data : any = {};
    profile : any = {};
    listingDate : any;
    updatedListingDate : any;
    errorMessage: string;
    email : any = {};

    listingId : string;

    ngOnInit() {

    }
    // The subscribes to the getPosts stream from the PostService
    getListingForId(id: any) {
        console.log("Param Id", id);
        this.busy = this.listingService.getGetListingForId(id)
            .subscribe(
                listing => this.data = listing,
                error => this.alertService.error("Error getting the Listing, it might not exist!"),
                ()=>{
                    this.list = this.data['userListing'];
                    this.profile = this.data['userProfileDto'];
                    console.log("list", this.list);
                    console.log("prifle", this.profile);
                    var dt = new Date(Date.parse(this.list.listingDate));
                    this.listingDate = dt.getFullYear() + "/" + dt.getMonth() + "/" + dt.getDay();
                    var dt2 = new Date(Date.parse(this.list.lastUpdatedDate));
                    this.updatedListingDate = dt2.getFullYear() + "/" + dt2.getMonth() + "/" + dt2.getDay();
                }
            )
    }

    sendEmailToFreeLancer(){
        if(this.email.message == null || this.email.message == ""){
            this.alertService.warn("Please enter a Message!")
            return;
        }
        if(this.email.fromEmail == null || this.email.fromEmail == ""){
            this.alertService.warn("Please enter a valid email!")
            return;
        }

        this.email.listingId = this.listingId;
        this.email.freeLancerUserId = this.profile.userId;

        this.busy = this.listingService.sendEmailToFreelancer(this.email)
            .subscribe(
                response => console.log("response", response) ,
                error => this.alertService.error(error._body),
                ()=>{
                   this.alertService.success("Your Email has been send.");
                   this.email.message = "";
                   this.email.fromEmail = "";
                   this.email.listingId = "";
                   this.email.freeLancerUserId = "";
                }
            )
    }
}
