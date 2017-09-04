import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../_models/index';

@Injectable()
export class UserService {
    constructor(private http: Http) { }
    private baseUrl = 'http://192.168.100.101:81';
    create(user: User) {
        var body = `firstname=${user.firstname}&lastname=${user.lastname}&password=${user.password}&confirmpassword=${user.password}&email=${user.email}`;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.post(this.baseUrl+'/api/auth/register', body, {headers: headers});
    }
    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}