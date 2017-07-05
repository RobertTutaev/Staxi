import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  redirectUrl: string;

  private headers = new Headers({'Content-Type': 'application/json'});
  private carsUrl = environment.myEndpoint + 'api/car';

  constructor(private http: Http) {}

  signin({ username, password }): Promise<boolean> {

    return this.http
        .post(environment.myEndpoint + 'signin', JSON.stringify({ username, password }), {headers: this.headers})
        .toPromise()
        .then(res => {console.log(res.json().data); return res.json().data as boolean})
        .catch(this.handleError);
  
    /*
    return new Promise(resolve => {
      let validCredentials: boolean = false;

      // @NOTE: In a normal scenario this check
      // should be performed against a web service:
      if (username === 'john.doe@mail.com' &&
        password === 'letmein') {
        validCredentials = true;
        window.sessionStorage.setItem('token', 'eyJhbGciOi');
      }

      resolve(validCredentials);
    });*/
  }

  signout(): Promise<boolean> {
    return new Promise(resolve => {
      window.sessionStorage.removeItem('token');
      
      resolve(true);
    });
  }

  get isSignedIn(): boolean {
    return !!window.sessionStorage.getItem('token');
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}