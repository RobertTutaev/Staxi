import { Injectable }    from '@angular/core';
import { Headers, Http, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { Stat } from '../_classes/list/stat';
import { Transportation } from '../_classes/list/transportation';
import { RService } from '../_classes/r.service';

@Injectable()
export class TransportationService extends RService{

  private headers = new Headers({'Content-Type': 'application/json'});
  private transportationsUrl = environment.myEndpoint + 'api/transportation';

  constructor(private http: Http) { super(); }

  getTransportations(id: number, column: string = 'id', direction: number = -1): Promise<Transportation[]> {
    const url = `${this.transportationsUrl}/c${id}/0/${column}/${direction}`;

    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Transportation[])
      .catch(this.handleError);
  }

  getTFile(id: number, column: string = 'id', direction: number = -1) {
    const url = `${this.transportationsUrl}/c${id}/1/${column}/${direction}`;

    return this.http.get(url, {
            headers: this.headers,
            responseType: ResponseContentType.Blob
        })
        .toPromise()
        .then(response => this.saveAsBlobExcel(response, 't'))
        .catch(error => this.handleError(error));
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
}