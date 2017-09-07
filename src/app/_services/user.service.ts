import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {User} from '../_models/index';
import {Observable} from "rxjs/Observable";

@Injectable()
export class UserService {
    constructor(private http: Http) {
    }

    // private baseUrl = 'http://192.168.100.103:81';
    private baseUrl = 'https://www.skillzas.tk';
    private getUserProfileSettingsUrl = this.baseUrl + '/api/user/getprofileforusersettings';
    private changeProfileImageUrl = this.baseUrl + '/api/user/changeProfile';
    private getProfileByUserIdUrl = this.baseUrl + '/api/user/id=';

    create(user: User) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let options = new RequestOptions({headers: headers});
        let body: any;
        return this.http.post(this.baseUrl + '/api/auth/register', user, options);
    }

    getUserProfileSettings(): Observable<any[]> {
        let userInfo: any = this.getToken();
        let token = userInfo.token;
        let headers = new Headers();
        headers.append("Authorization", 'Bearer ' + token);
        headers.append("Content-Type", "application/json");
        let options = new RequestOptions({headers: headers});

        return this.http.get(this.getUserProfileSettingsUrl, options).map(this.parseData).catch(this.handleError);
    }

    getProfileByUserId(userId : string): Observable<any[]> {
        let userInfo: any = this.getToken();
        // let token = userInfo.token;
        let headers = new Headers();
        // headers.append("Authorization", 'Bearer ' + token);
        headers.append("Content-Type", "application/json");
        let options = new RequestOptions({headers: headers});
        return this.http.get(this.getProfileByUserIdUrl + userId , options).map(this.parseData).catch(this.handleError);
    }

    changeProfileImage(file: any): Observable<any[]> {

        let userInfo: any = this.getToken();
        let token = userInfo.token;
        let headers = new Headers();
        headers.append("Authorization", 'Bearer ' + token);
        headers.append("Accept", "application/json");
        let options = new RequestOptions({headers: headers});
        let body: any;

        return this.http.post(this.changeProfileImageUrl, file, options).catch(this.handleError);
    }

    // private helper methods
    private parseData(res: Response) {
        // console.log('filter', JSON.stringify(res));
        return res.json() || [];
    }

    private getToken() {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    // Displays the error message
    private handleError(error: Response | any) {
        let errorMessage: string;

        errorMessage = error.message ? error.message : error.toString();
        return Observable.throw(errorMessage);
    }

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({'Authorization': 'Bearer ' + currentUser.token});
            return new RequestOptions({headers: headers});
        }
    }
}