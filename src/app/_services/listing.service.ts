import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import {Http, RequestOptions, Response} from '@angular/http';
import {Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {Listing} from "../_models/listing";
import {AddListing} from "../_models/addListingDto";
import {ApiConfig} from "../_app_config/apiConfig";

@Injectable()
export class ListingService {
    // private baseUrl = 'http://192.168.100.103:81';
    private baseUrl = ApiConfig.ApiUrl;
    private getAllListingUrl =  this.baseUrl+'/api/listing/getalllisting';
    private getFilterOptionsUrl = this.baseUrl+'/api/listing/getfilteroptions';
    private getAllListingForUserUrl = this.baseUrl+'/api/listing/getalllistingforuser';
    private createNewListingUrl = this.baseUrl+'/api/listing/newlisting';
    private updateListingUrl = this.baseUrl+'/api/listing/updatelisting';
    private disableListingUrl = this.baseUrl+'/api/listing/setlistingenabled';
    private deleteListingUrl = this.baseUrl+'/api/listing/deletelisting';
    private searchListingUrl = this.baseUrl+'/api/listing/searchlistings';
    private getListingForIdUrl = this.baseUrl+'/api/browse/id=';
    private sendEmailToFreelancerUrl = this.baseUrl+'/api/listing/ContactSeller';

    constructor(private http: Http) { }

    getAllListings (): Observable<Listing[]> {
        return this.http.get(this.getAllListingUrl).map(this.parseData).catch(this.handleError);
    }
    searchListings (searchModel : any): Observable<any []> {
        let headers = new Headers();
        headers.append("Content-Type","application/json");
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.searchListingUrl, searchModel, options).map(this.parseData).catch(this.handleError);
    }
    getGetListingForId (id: any): Observable<any[]> {
        return this.http.get(this.getListingForIdUrl+id).map(this.parseData).catch(this.handleError);
    }
    getFilterOptions (): Observable<any[]> {
        return this.http.get(this.getFilterOptionsUrl).map(this.parseData).catch(this.handleError);
    }
    disableListing(listing : any):  Observable<any[]>{
        let userInfo: any = this.getToken();
        let token = userInfo.token;
        let headers = new Headers();
        headers.append("Authorization",'Bearer ' + token);
        headers.append("Content-Type","application/json");
        let options = new RequestOptions({ headers: headers });
        let body :any;

        return this.http.post(this.disableListingUrl, listing, options).catch(this.handleError);
    }
    sendEmailToFreelancer(email : any):  Observable<any[]>{
        let userInfo: any = this.getToken();
        let token = userInfo.token;
        let headers = new Headers();
        headers.append("Authorization",'Bearer ' + token);
        headers.append("Content-Type","application/json");
        let options = new RequestOptions({ headers: headers });
        let body :any;

        return this.http.post(this.sendEmailToFreelancerUrl, email, options).catch(this.handleError);
    }
    deleteListing(listing : any):  Observable<any[]>{
        let userInfo: any = this.getToken();
        let token = userInfo.token;
        let headers = new Headers();
        headers.append("Authorization",'Bearer ' + token);
        headers.append("Content-Type","application/json");
        let options = new RequestOptions({ headers: headers });
        let body :any;

        return this.http.post(this.deleteListingUrl, listing, options).catch(this.handleError);
    }

    getAllListingsForUser (): Observable<any[]> {
        let userInfo: any = this.getToken();
        let token = userInfo.token;
        let headers = new Headers();
        headers.append("Authorization",'Bearer ' + token);
        headers.append("Content-Type","application/json");
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.getAllListingForUserUrl, options).map(this.parseData).catch(this.handleError);
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

    updateListing (listing: any): Observable<Listing[]> {

        let userInfo: any = this.getToken();
        let token = userInfo.token;
        let headers = new Headers();
        headers.append("Authorization",'Bearer ' + token);
        headers.append("Content-Type","application/json");
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.updateListingUrl, listing, options).catch(this.handleError);
    }
    // This method parses the data to JSON
    private parseData(res: Response)  {
        // console.log('filter', JSON.stringify(res));
        return res.json() || [];
    }

    private getToken(){
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    // Displays the error message
    private handleError(error: Response | any) {
        let errorMessage: string;

        errorMessage = error.message ? error.message : error.toString();
        return Observable.throw(errorMessage);
    }
}