import {Component, OnInit} from '@angular/core';
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
import {AuthGuard} from "../_guards/auth.guard";

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'listing.component.html'
})
export class ListingComponent implements OnInit {
    constructor(private router: Router, private authGuard: AuthGuard, private listingService: ListingService, public dialog: MdDialog, public alertService: AlertService) {

    }

    busy: Subscription;
    results: any;
    errorMessage: string;
    lists: Listing[];
    toggleFilterEnabled: boolean = false;
    listings: any = {};
    countries: any = {};
    provinces: any = {};
    cities: any = {};
    selectedListing: any = {};
    SelectedListingViewModel: any;
    selectedCountry: any = {};
    SelectedCountryViewModel: any = {};
    selectedProvince: any = {};
    SelectedProvinceViewModel: any = {};
    selectedCity: any = {};
    SelectedCityViewModel: any = {};
    provinceSelectionEnabled: boolean = false;
    citySelectionEnabled: boolean = false;
    filterOptions: any;

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
                () => {
                    this.countries = this.filterOptions.countryList;
                    this.listings = this.filterOptions.listingTypes;
                    this.selectedListing = this.listings[0];
                }
            )
    }

    onClickAddListing(){
        if(this.authGuard.userLogedin){
            this.router.navigate(['profile']);
        }else{
            this.alertService.warn("Please Login to Add a listing!");
        }
    }

    countryOptionsChanged() {
        let as = JSON.parse(this.selectedCountry);
        this.SelectedCountryViewModel = as;

        if (this.SelectedCountryViewModel != null) {
            this.provinceSelectionEnabled = true;
            this.citySelectionEnabled = false;
            this.cities = {};
            console.log("coutry optons changed is fired");
            this.provinces = this.SelectedCountryViewModel.provinces;
        }
    }

    provinceOptionsChanged() {
        let as = JSON.parse(this.selectedProvince);
        this.SelectedProvinceViewModel = as;

        if (this.SelectedProvinceViewModel != null) {
            this.citySelectionEnabled = true;
            this.cities = this.SelectedProvinceViewModel.cities;
        }
    }

    cityOptionsChanged() {
        let as = JSON.parse(this.selectedCity);
        this.SelectedCityViewModel = as;
    }

    catagoryOptionsChanged() {
        let as = JSON.parse(this.selectedListing);
        this.SelectedListingViewModel = as;
    }

    openViewListingPage(listing: any) {
        this.router.navigate(['listing', listing.userListingId]);
    }

    toggleFilter() {
        if (this.toggleFilterEnabled == true) {
            this.toggleFilterEnabled = false;
        } else {
            this.toggleFilterEnabled = true;
        }

    }

    // The subscribes to the getPosts stream from the PostService
    getAllListings() {
        this.busy = this.listingService.getAllListings()
            .subscribe(
                listings => this.lists = listings['listingsCollection'],
                error =>this.alertService.error(error._body),
                () => {
                }
            )
    }

    clearSearchFilters() {
        this.citySelectionEnabled = false;
        this.provinceSelectionEnabled = false;
        this.SelectedCityViewModel = null;
        this.SelectedProvinceViewModel = null;
        this.SelectedCountryViewModel = null;
        this.SelectedListingViewModel = null;
    }

    searchListings() {
        let model: any = {};
        if (this.SelectedListingViewModel) {
            model.FilterType = this.SelectedListingViewModel.listingType;
        } else {
            model.FilterType = null;
        }
        if (this.SelectedListingViewModel) {
            model.CountryType = this.SelectedCountryViewModel.countryType;
        } else {
            model.CountryType = null;
        }
        if (this.SelectedListingViewModel) {
            model.ProvinceType = this.SelectedProvinceViewModel.provinceType;
        } else {
            model.ProvinceType = null
        }
        if (this.SelectedListingViewModel) {
            model.CityType = this.SelectedCityViewModel.cityType;
        } else {
            model.CityType = null
        }

        this.busy = this.listingService.searchListings(model)
            .subscribe(
                listings => this.lists = listings['listingsCollection'],
                error => this.alertService.error(error._body),
                () => {
                    this.alertService.success("Search has completed!")
                }
            )
    }
}
