import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';
import { User } from '../_classes/list/user';

@Injectable()
export class AuthService {
  redirectUrl: string;
  user: User = null;

  private headers = new Headers({'Content-Type': 'application/json'});
  private authUrl = environment.myEndpoint + 'auth/';

  constructor(private http: Http) {}

  signin({ username, password }): Promise<User> {
    return this.http
        .post(this.authUrl + 'signin', JSON.stringify({ username, password }), {headers: this.headers})
        .toPromise()
        .then(res => this.user = res.json().data as User)
        .catch(this.handleError);
  }

  signout(): Promise<User> {
    return this.http
        .post(this.authUrl + 'signout', JSON.stringify({}), {headers: this.headers})
        .toPromise()
        .then(res => !res.json().data ? this.user = null : this.user)
        .catch(this.handleError);
  }

  get isSignedIn(): boolean {
    return !!this.user;
  }

  get authUser(): User {
    return this.user;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}