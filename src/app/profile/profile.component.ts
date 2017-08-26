import { Component, OnInit } from '@angular/core';
import {Listing} from "../_models/listing";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {HttpClient, HttpResponse, HttpHeaders} from "@angular/common/http";
import {ListingService} from "../_services/listing.service";

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'profile.component.html',
})

export class ProfileComponent implements OnInit {
    constructor( private listingService: ListingService){

    }
    results: any;
    errorMessage: string;
    lists : Listing[];
    ngOnInit() { this.getAllListings(); }

    // The subscribes to the getPosts stream from the PostService
    getAllListings() {
        this.listingService.getAllListings()
            .subscribe(
                listings => this.lists = listings['listingsCollection'],
                error => this.errorMessage = error
            )
    }
}