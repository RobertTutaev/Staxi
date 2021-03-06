import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';
import { Resp } from '../_classes/resp';
import { User } from '../_classes/list/user';

@Injectable()
export class AuthService {
  redirectUrl: string;
  private resp: Resp = new Resp();
  private headers = new Headers({'Content-Type': 'application/json'});
  private authUrl = environment.myEndpoint + 'auth/';

  constructor(private http: Http) {}

  signin({ username, password }): Promise<User> {
    return this.http
        .post(this.authUrl + 'signin', JSON.stringify({ username, password }), {headers: this.headers})
        .toPromise()
        .then(res => {
          this.resp = res.json();
          return this.resp.data as User;
        })
        .catch(this.handleError);
  }

  signout(): Promise<User> {
    return this.http
        .post(this.authUrl + 'signout', JSON.stringify({}), {headers: this.headers})
        .toPromise()
        .then(res => {
          this.resp = res.json();
          return this.resp.data as User;
        })
        .catch(this.handleError);
  }

  isSign(): Promise<User> {
    return this.http
        .get(this.authUrl + 'issign', JSON.stringify({}))
        .toPromise()
        .then(res => {
          this.resp = res.json();
          return this.resp.data as User;
        })
        .catch(this.handleError);
  }

  get isSignedIn(): boolean {
    return !!this.resp.data;
  }

  get authUser(): User {
    return this.resp.data;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
