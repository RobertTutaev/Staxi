import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { Stat } from '../_classes/list/stat';
import { Transportation } from '../_classes/list/transportation';

@Injectable()
export class TransportationService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private transportationsUrl = environment.myEndpoint + 'api/transportation';

  constructor(private http: Http) {}

  getTransportations(id: number): Promise<Transportation[]> {
    const url = `${this.transportationsUrl}/c${id}`;

    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Transportation[])
      .catch(this.handleError);
  }

  getTransportation(id: number): Promise<Transportation> {
    if (!id) {
      const promise: Promise<Transportation> = new Promise(() => new Transportation());

      return promise.then();      
    } else {
      const url = `${this.transportationsUrl}/${id}`;

      return this.http.get(url)
        .toPromise()
        .then(response => response.json().data as Transportation)
        .catch(this.handleError);
    }
  }

  getStat(id: number): Promise<Stat[]> {
    const url = `${this.transportationsUrl}/stat${id}`;

    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Stat[])
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.transportationsUrl}/${id}`;

    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  create(transportation: Transportation): Promise<Transportation> {
    return this.http
      .post(this.transportationsUrl, JSON.stringify(transportation), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Transportation)
      .catch(this.handleError);
  }

  update(transportation: Transportation): Promise<Transportation> {
    const url = `${this.transportationsUrl}/${transportation.id}`;

    return this.http
      .put(url, JSON.stringify(transportation), {headers: this.headers})
      .toPromise()
      .then(() => transportation)
      .catch(this.handleError);
  }  

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}