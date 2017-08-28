import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Observable }     from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Street } from '../_classes/list/street';

@Injectable()
export class StreetService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private streetsUrl = environment.myEndpoint + 'api/street';

  constructor(private http: Http) {}

  getStreets(): Promise<Street[]> {
    return this.http.get(this.streetsUrl)
               .toPromise()
               .then(response => response.json().data as Street[])
               .catch(this.handleError);
  }

  getStreet(id: number): Promise<Street> {
    if (!id) {
      const promise: Promise<Street> = new Promise(() => new Street());

      return promise.then();      
    } else {
      const url = `${this.streetsUrl}/${id}`;

      return this.http.get(url)
        .toPromise()
        .then(response => response.json().data as Street)
        .catch(this.handleError);
    }
  }

  search(term: string): Observable<Street[]> {
    const url = `${this.streetsUrl}/?name=${encodeURIComponent(term)}`;
    
    return this.http.get(url)
      .map(response => response.json().data as Street[]);
  }

  delete(id: number): Promise<void> {
    const url = `${this.streetsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(response => response.json())
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