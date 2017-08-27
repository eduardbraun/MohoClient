import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import {Http, RequestOptions, Response} from '@angular/http';
import {Headers} from '@angular/http';
// All the RxJS stuff we need
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import 'rxjs/add/observable/throw';
import {Listing} from "../_models/listing";
import {AddListing} from "../_models/addListingDto";
// import {HttpClient} from "@angular/common/http";
// import {HttpClient, HttpResponse, HttpHeaders} from "@angular/common/http";
@Injectable()
export class ListingService {
    private getAllListingUrl = 'http://192.168.100.103:81/api/listing/getalllisting';
    private createNewListingUrl = 'http://192.168.100.103:81/api/listing/newlisting';

    constructor(private http: Http) { }





    getAllListings (): Observable<Listing[]> {
        return this.http.get(this.getAllListingUrl).map(this.parseData).catch(this.handleError);
    }

    createNewListing (listing: AddListing): Observable<Listing[]> {

        let userInfo: any = this.getToken();
        let token = userInfo.token;
        let headers = new Headers();
        headers.append("Authorization",'Bearer ' + token);
        headers.append("Content-Type","application/json");
        let options = new RequestOptions({ headers: headers });
        let body :any;

        return this.http.post(this.createNewListingUrl, listing, options).catch(this.handleError);
    }


    // This method parses the data to JSON
    private parseData(res: Response)  {
        return res.json() || [];
    }

    private getToken(){
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    // Displays the error message
    private handleError(error: Response | any) {
        let errorMessage: string;

        errorMessage = error.message ? error.message : error.toString();

        // In real world application, call to log error to remote server
        // logError(error);

        // This returns another Observable for the observer to subscribe to
        return Observable.throw(errorMessage);
    }

    // allListings: Listing[];
    // getAllLists(){
    //     this.http.get('http://192.168.100.103:81/api/listing/getalllisting').subscribe(data => {
    //         // Read the result field from the JSON response.
    //         this.allListings = data['listingsCollection'];
    //     });
    // }
}