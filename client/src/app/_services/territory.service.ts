import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { Territory } from '../_classes/list/territory';

@Injectable()
export class TerritoryService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private territoriesUrl = environment.myEndpoint + 'api/territory';

  constructor(private http: Http) {}

  getTerritories(): Promise<Territory[]> {
    return this.http.get(this.territoriesUrl)
        .toPromise()
        .then(res => res.json().data as Territory[])
        .catch(this.handleError);
  }

  getTerritory(id: number): Promise<Territory> {
    if (!id) {
      const promise: Promise<Territory> = new Promise(() => new Territory());

      return promise.then();
    } else {
      const url = `${this.territoriesUrl}/${id}`;

      return this.http.get(url)
          .toPromise()
          .then(res => res.json().data as Territory)
          .catch(this.handleError);
    }
  }

  delete(id: number): Promise<void> {
    const url = `${this.territoriesUrl}/${id}`;

    return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(res => res.json())
        .catch(this.handleError);
  }

  create(territory: Territory): Promise<Territory> {
    return this.http
        .post(this.territoriesUrl, JSON.stringify(territory), {headers: this.headers})
        .toPromise()
        .then(res => res.json().data as Territory)
        .catch(this.handleError);
  }

  update(territory: Territory): Promise<Territory> {
    const url = `${this.territoriesUrl}/${territory.id}`;

    return this.http
        .put(url, JSON.stringify(territory), {headers: this.headers})
        .toPromise()
        .then(res => res.json())
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
