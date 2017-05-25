import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Street } from '../_classes/street';

@Injectable()
export class StreetService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private streetsUrl = 'api/streets';  // URL to web api

  constructor(private http: Http) {}

  getStreets(): Promise<Street[]> {
    return this.http.get(this.streetsUrl)
               .toPromise()
               .then(response => response.json().data as Street[])
               .catch(this.handleError);
  }

  getStreet(id: number): Promise<Street> {
    if (!id) {
      const promise = new Promise(() => new Street());

      return promise.then();      
    } else {
      const url = `${this.streetsUrl}/${id}`;

      return this.http.get(url)
        .toPromise()
        .then(response => response.json().data as Street)
        .catch(this.handleError);
    }
  }

  delete(id: number): Promise<void> {
    const url = `${this.streetsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(street: Street): Promise<Street> {
    return this.http
      .post(this.streetsUrl, JSON.stringify(street), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Street)
      .catch(this.handleError);
  }

  update(street: Street): Promise<Street> {
    const url = `${this.streetsUrl}/${street.id}`;
    return this.http
      .put(url, JSON.stringify(street), {headers: this.headers})
      .toPromise()
      .then(() => street)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}