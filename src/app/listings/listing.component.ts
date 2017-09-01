import { Component, OnInit } from '@angular/core';
import {MdButtonModule, MdDialog, MdDialogRef} from '@angular/material';
import {Listing} from "../_models/listing";
import {Pipe, PipeTransform} from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {HttpClient, HttpResponse, HttpHeaders} from "@angular/common/http";
import {ListingService} from "../_services/listing.service";
import {Subscription} from "rxjs/Subscription";

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'listing.component.html',
})
export class ListingComponent implements OnInit {
    constructor( private listingService: ListingService, public dialog: MdDialog){

    }
    busy: Subscription;
    results: any;
    errorMessage: string;
    lists : Listing[];
    toggleFilterEnabled: boolean = false;
    ngOnInit() { this.getAllListings(); }

    toggleFilter(){
        if(this.toggleFilterEnabled == true){
            this.toggleFilterEnabled = false;
        }else{
            this.toggleFilterEnabled = true;
        }

    }
    // The subscribes to the getPosts stream from the PostService
    getAllListings() {
       this.busy = this.listingService.getAllListings()
            .subscribe(
                listings => this.lists = listings['listingsCollection'],
                error => this.errorMessage = error
            )
    }
}
