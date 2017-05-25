import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Firm } from '../_classes/firm';

@Injectable()
export class FirmService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private firmsUrl = 'api/firms';  // URL to web api

  constructor(private http: Http) {}

  getFirms(): Promise<Firm[]> {
    return this.http.get(this.firmsUrl)
               .toPromise()
               .then(response => response.json().data as Firm[])
               .catch(this.handleError);
  }

  getFirm(id: number): Promise<Firm> {
    if (!id) {
      const promise = new Promise(() => new Firm());

      return promise.then();      
    } else {
      const url = `${this.firmsUrl}/${id}`;

      return this.http.get(url)
        .toPromise()
        .then(response => response.json().data as Firm)
        .catch(this.handleError);
    }
  }

  delete(id: number): Promise<void> {
    const url = `${this.firmsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(firm: Firm): Promise<Firm> {
    return this.http
      .post(this.firmsUrl, JSON.stringify(firm), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Firm)
      .catch(this.handleError);
  }

  update(firm: Firm): Promise<Firm> {
    const url = `${this.firmsUrl}/${firm.id}`;
    return this.http
      .put(url, JSON.stringify(firm), {headers: this.headers})
      .toPromise()
      .then(() => firm)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}