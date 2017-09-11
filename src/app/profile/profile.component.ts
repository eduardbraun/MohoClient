import {Component, Input, OnInit, EventEmitter, ElementRef} from '@angular/core';
import {Listing} from "../_models/listing";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {HttpClient, HttpResponse, HttpHeaders} from "@angular/common/http";
import {ListingService} from "../_services/listing.service";
import {MdDialog, MdDialogRef} from "@angular/material";
import {error} from "util";
import {_finally} from "rxjs/operator/finally";
import {Subscription} from "rxjs/Subscription";
import {forEach} from "@angular/router/src/utils/collection";
import {AlertService} from "../_services/alert.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from '../_services/user.service';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'profile.component.html',
})
export class ProfileComponent implements OnInit {
    constructor( private router: Router, private listingService: ListingService,
                 private userService: UserService, public dialog: MdDialog,
                 private alertService: AlertService) {

    }
    busy: Subscription;
    busy2: Subscription;
    results: any = {};
    errorMessage: string;
    lists: any = {};
    profile: any = {};
    data : any = {};
    token: any = {};
    filteroptions :any = {};
    reviews: any = {};

    ngOnInit() {
        this.getUserProfile();
        this.getFilterOptions();
    }
    openViewListingPage(listing: any){
        this.router.navigate(['listing', listing.userListingId]);
    }
    openAddListingDialog() {
        let dialogRef = this.dialog.open(AddListingDialog, {
            width: '60%'
        });
        dialogRef.componentInstance.filterOptions = this.filteroptions;
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.results = result;
                console.log('result for adding is:', result);
                this.token = JSON.parse(localStorage.getItem('currentUser'));
                this.busy2 = this.listingService.createNewListing(result)
                    .subscribe(
                        listings =>  this.getAllListingsForUser(),
                        error =>{
                            this.alertService.error(error._body);
                        },
                        () =>{
                            this.alertService.success("Successfully added new Listing!");
                        }
                    )
            } else {
                //user clicked canceled
            }

        });
    }

    openDisableListingDialog(listing: any) {
        let dialogRef = this.dialog.open(DisableListingDialog, {
            width: '30%'
        });
        dialogRef.componentInstance.updatedListing = listing;
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.results = result;
                console.log('result for disableing is:', result);
                this.token = JSON.parse(localStorage.getItem('currentUser'));
                this.busy = this.listingService.disableListing(result)
                    .subscribe(
                        listings => this.data = listings ,
                        error =>{
                            this.alertService.error(error._body);
                        },
                        () =>{
                            console.log('result for data is:', this.data);
                            this.getAllListingsForUser();
                            if(result.Enabled == true){
                                this.alertService.success("Successfully Enabled Listing!");
                            }else{
                                this.alertService.success("Successfully Disabled Listing!");
                            }

                        }
                    )
            } else {
                //user clicked canceled
            }

        });
    }

    openDeleteListingDialog(listing: any) {
        let dialogRef = this.dialog.open(DeleteListingDialog, {
            width: '30%'
        });
        dialogRef.componentInstance.updatedListing = listing;
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.results = result;
                console.log('result for disableing is:', result);
                this.token = JSON.parse(localStorage.getItem('currentUser'));
                this.busy2 = this.listingService.deleteListing(result)
                    .subscribe(
                        listings => this.data = listings[''],
                        error =>{
                            this.alertService.error(error._body);
                        },
                        () =>{
                            this.getAllListingsForUser();
                            this.alertService.success("Successfully Deleted Listing!");
                        }
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
            dialogRef.componentInstance.filterOptions = this.filteroptions;
            dialogRef.componentInstance.updatedListing = updateList;
            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this.results = result;
                    this.busy = this.listingService.updateListing(result)
                        .subscribe(
                            listings =>  this.getAllListingsForUser(),
                            error =>{
                                this.alertService.error(error._body);
                            },
                            () =>{
                                this.alertService.success("Successfully updated Listing!");
                            }
                        )
                } else {
                    //user clicked canceled
                }

            });
        }
    }

    openChangeProfilePictureDialog(){
        let dialogRef = this.dialog.open(ChangeProfilePictureDialog, {

        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.results = result;
                this.busy = this.userService.changeProfileImage(result)
                    .subscribe(
                        profile => this.profile = JSON.parse(profile['_body']),
                        error =>{
                            this.alertService.error(error._body);
                        },
                        () =>{
                            this.alertService.success("Successfully updated Profile Image!");
                            console.log("profile", this.profile);
                        }
                    )
            } else {
                //user clicked canceled
            }

        });
    }

    getAllListingsForUser() {
        this.listingService.getAllListingsForUser()
            .subscribe(
                listings => this.lists = listings['userListingCollectionDto'],
                error => this.alertService.error(error._body),
                ()=>{
                  console.log("new get all", this.lists);
                }
            )
    }

    getUserProfile() {
        this.busy = this.userService.getUserProfileSettings()
            .subscribe(
                listings => this.data = listings,
                error => this.alertService.error(error._body),
                ()=>{
                    this.lists = this.data['userListingCollectionDto'];
                    this.profile = this.data['userProfileDto'];
                    this.reviews = this.data['userProfileReviewList'];
                }
            )
    }
    getFilterOptions() {
        this.busy = this.listingService.getFilterOptions()
            .subscribe(
                filters => this.filteroptions = filters,
                error => {
                    this.alertService.error(error._body);
                }
            )
    }
}

@Component({
    selector: 'changeProfilePictureDialog',
    templateUrl: '../profile/changeProfilePictureDialog.html',
})
export class ChangeProfilePictureDialog implements OnInit{

    constructor(public dialogRef: MdDialogRef<ChangeProfilePictureDialog>,
                private el: ElementRef, private alertService: AlertService) {
    }

    selectedFile : any;

    ngOnInit(): void {

    }
    saveDialog() {
        let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#profileImageChange');
        let fileCount: number = inputEl.files.length;
        if (fileCount > 0) {
            this.selectedFile = inputEl.files.item(0);
            if(this.selectedFile.type.match('image.*')){
                let formData:FormData = new FormData();
                formData.append(this.selectedFile.name, this.selectedFile);
                console.log('selectedFile is:', formData);
                this.dialogRef.close(formData);
            }
            else{
                this.alertService.error("The file you have selected is not an image");
            }
        }else{
            this.alertService.error("You have not selected an Image");
        }
    }
}

@Component({
    selector: 'addListing.component',
    templateUrl: '../profile/addListing.component.html',
})
export class AddListingDialog implements OnInit{

    constructor(public dialogRef: MdDialogRef<AddListingDialog>) {
    }

    ListingViewModel = function (listing: any) {
        this.listingFilterName = listing.listingFilterName;
        this.listingType = listing.listingType;
    };
    @Input() filterOptions: any = {};
    newListing: any = {};
    provinceSelectionEnabled: boolean = false;
    citySelectionEnabled: boolean = false;
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

    ngOnInit(): void {
        console.log('filteroptions is:', JSON.stringify(this.filterOptions));
        this.countries = this.filterOptions.countryList;
        this.listings = this.filterOptions.listingTypes;
    }


    saveDialog() {
        this.newListing.ListingType = this.SelectedListingViewModel.listingType;
        this.newListing.ListingCountry = this.SelectedCountryViewModel.countryType;
        this.newListing.ListingProvince = this.SelectedProvinceViewModel.provinceType;
        this.newListing.ListingCity = this.SelectedCityViewModel.cityType;
        this.dialogRef.close(this.newListing);
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
}

@Component({
    selector: 'updateListing.component',
    templateUrl: '../profile/updateListing.component.html',
})
export class UpdateListingDialog implements OnInit {
    @Input() filterOptions: any = {};
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
    SelectedListing : any = {};
    SelectedCountry : any = {};
    SelectedProvince : any = {};
    SelectedCity : any = {};

    listings : any = {};
    countries : any = {};
    provinces: any = {};
    cities: any = {};

    ngOnInit(): void {
        this.listing = new this.UpdateListingViewModel(this.updatedListing);
        this.countries = this.filterOptions.countryList;
        this.listings = this.filterOptions.listingTypes;
        // for(var i = 0;i<this.listings.length;i++) {
        //    var listing = this.listings[i];
        //    if(listing.listingFilterName == this.listing.ListingType){
        //        this.SelectedListing = listing;
        //    }
        // }
        // for(var i = 0;i<this.countries.length;i++) {
        //     var country = this.countries[i];
        //     if(country.countryName == this.listing.ListingCountry){
        //         this.SelectedCountry = country;
        //         this.provinces = country.provinces;
        //         for(var j = 0;j< country.provinces.length;j++) {
        //             var province = country.provinces[j];
        //             if(province.provinceName == this.listing.ListingProvince){
        //                 this.SelectedProvince = province;
        //                 this.cities = province.cities;
        //                 for(var k = 0;k < province.cities.length;k++) {
        //                     var city = province.cities[k];
        //                     if(city.cityName == this.listing.ListingCity){
        //                         this.SelectedCity = city;
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }
        console.log('userId is:', JSON.stringify(this.listing));
        console.log('this.updatedListing is:', JSON.stringify(this.updatedListing));
        // console.log('listings is:',this.listings );
        // console.log('countries is:',this.countries );
        // console.log('provinces is:', this.provinces);
        // console.log('citites is:', this.cities);
    }

    saveDialog() {
        this.dialogRef.close(this.listing);
    }
}

@Component({
    selector: 'addListing.component',
    templateUrl: '../profile/disableListingDialog.component.html',
})
export class DisableListingDialog implements OnInit {
    @Input() updatedListing: any = {};
    listing: any;
    title : string;
    constructor(public dialogRef: MdDialogRef<UpdateListingDialog>) {
    }

    ListingViewModel = function (listing: any) {
        this.UserListingId = listing.userListingId;
        this.OwnerId = listing.ownerId;
        this.Enabled = listing.listingEnabled;
    };


    ngOnInit(): void {
        console.log('list is:', this.updatedListing);
        this.listing = new this.ListingViewModel(this.updatedListing);

        if(this.listing.Enabled){
            this.title = "Disable";
        }else{
            this.title = "Enable";
        }

    }

    saveDialog() {
        if(this.listing.Enabled){
            this.listing.Enabled = false;
        }else{
            this.listing.Enabled = true;
        }

        this.dialogRef.close(this.listing);
    }
}

@Component({
    selector: 'addListing.component',
    templateUrl: '../profile/disableListingDialog.component.html',
})
export class DeleteListingDialog implements OnInit {
    @Input() updatedListing: any = {};
    listing: any;
    title: string = "Delete";

    constructor(public dialogRef: MdDialogRef<UpdateListingDialog>) {
    }

    ListingViewModel = function (listing: any) {
        this.UserListingId = listing.userListingId;
        this.OwnerId = listing.ownerId;
    };


    ngOnInit(): void {
        console.log('list is:', this.updatedListing);
        this.listing = new this.ListingViewModel(this.updatedListing);

    }

    saveDialog() {
        this.dialogRef.close(this.listing);
    }
}