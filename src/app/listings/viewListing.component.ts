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

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'viewListing.component.html',
})
export class ViewListingComponent implements OnInit {
    constructor(private route: ActivatedRoute, private listingService: ListingService, public dialog: MdDialog, private alertService: AlertService){
        this.route.params.subscribe( params =>{
            console.log(params);
            this.getListingForId(params['id'])
        });
    }

    busy: Subscription;
    list : any = {};
    errorMessage: string;
    toggleFilterEnabled: boolean = false;
    ngOnInit() {
    }

    // The subscribes to the getPosts stream from the PostService
    getListingForId(id: any) {
        console.log("Param Id", id);
        this.busy = this.listingService.getGetListingForId(id)
            .subscribe(
                listing => this.list = listing['userListing'],
                error => this.alertService.error("Error getting the Listing, it might not exist!"),
                ()=>{
                    console.log("list", this.list);
                }
            )
    }
}
