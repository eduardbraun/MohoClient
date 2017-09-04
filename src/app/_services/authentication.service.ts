import {EventEmitter, Injectable, Output} from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {HttpHeaders} from "@angular/common/http";

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }
    private baseUrl = 'http://192.168.100.101:81';
    @Output() getUserInfo: EventEmitter<any> = new EventEmitter();

    login(email: string, password: string) {
        var body = `email=${email}&password=${password}`;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post(this.baseUrl+'/api/auth/token', body, {headers: headers})
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                this.getUserInfo.emit(user);
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}