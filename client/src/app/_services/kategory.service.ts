import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { Kategory } from '../_classes/list/kategory';

@Injectable() 
export class KategoryService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private kategoriesUrl = environment.myEndpoint + 'api/kategory';

  constructor(private http: Http) {}

  getKategories(id: number): Promise<Kategory[]> {
    const url = `${this.kategoriesUrl}?client_id=${id}`;

    return this.http.get(this.kategoriesUrl)
               .toPromise()
               .then(response => response.json().data as Kategory[])
               .catch(this.handleError);
  }

  getKategory(id: number): Promise<Kategory> {
    if (!id) {
      const promise = new Promise(() => new Kategory());

      return promise.then();      
    } else {
      const url = `${this.kategoriesUrl}/${id}`;

      return this.http.get(url)
        .toPromise()
        .then(response => response.json().data as Kategory)
        .catch(this.handleError);
    }
  }

  delete(id: number): Promise<void> {
    const url = `${this.kategoriesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(kategory: Kategory): Promise<Kategory> {
    return this.http
      .post(this.kategoriesUrl, JSON.stringify(kategory), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Kategory)
      .catch(this.handleError);
  }

  update(kategory: Kategory): Promise<Kategory> {
    const url = `${this.kategoriesUrl}/${kategory.id}`;
    return this.http
      .put(url, JSON.stringify(kategory), {headers: this.headers})
      .toPromise()
      .then(() => kategory)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}