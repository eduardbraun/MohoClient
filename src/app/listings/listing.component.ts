import { Component, OnInit } from '@angular/core';
import {MdButtonModule, MdDialog, MdDialogRef} from '@angular/material';
import {Listing} from "../_models/listing";
import {Pipe, PipeTransform} from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {HttpClient, HttpResponse, HttpHeaders} from "@angular/common/http";
import {ListingService} from "../_services/listing.service";
import {Subscription} from "rxjs/Subscription";
import {Router} from "@angular/router";
import {AlertService} from "../_services/alert.service";

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'listing.component.html',
})
export class ListingComponent implements OnInit {
    constructor( private router: Router, private listingService: ListingService, public dialog: MdDialog, private alertService: AlertService){

    }
    busy: Subscription;
    results: any;
    errorMessage: string;
    lists : Listing[];
    toggleFilterEnabled: boolean = false;
    listings : any = {};
    countries : any = {};
    provinces: any = {};
    cities: any = {};
    selectedListing: any;
    SelectedListingViewModel : any;
    selectedCountry: any = {};
    SelectedCountryViewModel: any = {};
    selectedProvince: any = {};
    SelectedProvinceViewModel: any = {};
    selectedCity : any ={};
    SelectedCityViewModel: any = {};
    provinceSelectionEnabled: boolean = false;
    citySelectionEnabled: boolean = false;
    filterOptions : any;

    ngOnInit() {
        this.getAllListings();
        this.getFilterOptions();
    }

    getFilterOptions() {
        this.busy = this.listingService.getFilterOptions()
            .subscribe(
                filters => this.filterOptions = filters,
                error => {
                    this.alertService.error("Error getting filters");
                },
                ()=>{
                    this.countries = this.filterOptions.countryList;
                    this.listings = this.filterOptions.listingTypes;
                }
            )
    }
    countryOptionsChanged(){
        let as = JSON.parse(this.selectedCountry);
        this.SelectedCountryViewModel = as;

        if(this.SelectedCountryViewModel != null){
            this.provinceSelectionEnabled = true;
            this.citySelectionEnabled = false;
            this.cities = {};
            this.provinces = this.SelectedCountryViewModel.provinces;
        }
    }
    provinceOptionsChanged(){
        let as = JSON.parse(this.selectedProvince);
        this.SelectedProvinceViewModel = as;

        if(this.SelectedProvinceViewModel != null){
            this.citySelectionEnabled = true;
            this.cities = this.SelectedProvinceViewModel.cities;
        }
    }
    cityOptionsChanged(){
        let as = JSON.parse(this.selectedCity);
        this.SelectedCityViewModel = as;
    }
    catagoryOptionsChanged(){
        let as = JSON.parse(this.selectedListing);
        this.SelectedListingViewModel = as;
    }

    openViewListingPage(listing: any){
        this.router.navigate(['listing', listing.userListingId]);
    }

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
