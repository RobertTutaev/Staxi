import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { Punkt } from '../_classes/list/punkt';

@Injectable()
export class PunktService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private punktsUrl = environment.myEndpoint + 'api/punkt';

  constructor(private http: Http) {}

  getPunkts(): Promise<Punkt[]> {
    return this.http.get(this.punktsUrl)
               .toPromise()
               .then(response => response.json().data as Punkt[])
               .catch(this.handleError);
  }

  getPunkt(id: number): Promise<Punkt> {
    if (!id) {
      const promise = new Promise(() => new Punkt());

      return promise.then();      
    } else {
      const url = `${this.punktsUrl}/${id}`;

      return this.http.get(url)
        .toPromise()
        .then(response => response.json().data as Punkt)
        .catch(this.handleError);
    }
  }

  delete(id: number): Promise<void> {
    const url = `${this.punktsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(punkt: Punkt): Promise<Punkt> {
    return this.http
      .post(this.punktsUrl, JSON.stringify(punkt), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Punkt)
      .catch(this.handleError);
  }

  update(punkt: Punkt): Promise<Punkt> {
    const url = `${this.punktsUrl}/${punkt.id}`;
    return this.http
      .put(url, JSON.stringify(punkt), {headers: this.headers})
      .toPromise()
      .then(() => punkt)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}