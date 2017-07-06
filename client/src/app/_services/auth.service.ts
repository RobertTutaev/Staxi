import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  redirectUrl: string;

  isLoggedIn = false;
  // window.sessionStorage.setItem('token', 'eyJhbGciOi');
  // !!window.sessionStorage.getItem('token');
  // window.sessionStorage.removeItem('token');

  private headers = new Headers({'Content-Type': 'application/json'});
  private carsUrl = environment.myEndpoint + 'api/car';

  constructor(private http: Http) {}

  signin({ username, password }): Promise<boolean> {
    return this.http
        .post(environment.myEndpoint + 'signin', JSON.stringify({ username, password }), {headers: this.headers})
        .toPromise()
        .then(res => {
            return this.isLoggedIn = !!res.json().data;
        })
        .catch(this.handleError);
  }

  signout(): Promise<boolean> {
    return this.http
        .post(environment.myEndpoint + 'signout', JSON.stringify({}), {headers: this.headers})
        .toPromise()
        .then(res => {
            this.isLoggedIn = !res.json().data;            
            return !!res.json().data;
        })
        .catch(this.handleError);
  }

  get isSignedIn(): boolean {
    return this.isLoggedIn;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}