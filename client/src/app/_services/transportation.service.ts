import { Injectable } from '@angular/core';
import { Headers, Http, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { Stat } from '../_classes/list/stat';
import { Transportation } from '../_classes/list/transportation';
import { RService } from '../_classes/r.service';
import { InformedService } from '../_services/informed.service';

@Injectable()
export class TransportationService extends RService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private transportationsUrl = environment.myEndpoint + 'api/transportation';

  constructor(private http: Http,
              is: InformedService) { super(is); }

  getTransportations(id: number, column: string = 'id', direction: number = -1): Promise<Transportation[]> {
    const url = `${this.transportationsUrl}/c${id}/0/${column}/${direction}`;

    return this.http.get(url)
        .toPromise()
        .then(res => res.json().data as Transportation[])
        .catch(this.handleError);
  }

  getTFile(id: number, column: string = 'id', direction: number = -1) {
    const url = `${this.transportationsUrl}/c${id}/1/${column}/${direction}`;

    return this.http.get(url, {
            headers: this.headers,
            responseType: ResponseContentType.Blob
        })
        .toPromise()
        .then(res => this.saveAsBlobExcel(res, 't'))
        .catch(error => this.handleError(error));
  }

  getTransportation(id: number, cp: number = 0): Promise<Transportation> {
    if (!id) {
      return Promise.resolve(new Transportation());
    } else {
      const url = `${this.transportationsUrl}/${id}`;

      return this.http.get(url)
        .toPromise()
        .then(res => {
          // 2. Копирование заявки
          if (cp) {
            const t = res.json().data as Transportation;

            t.id = null;
            t.car_id = null;
            t.car = '',
            t.a_dt = null;
            t.b_dt = null;
            t.status_id = 1;
            t.user_id = null;
            t.user = null;
            t.dt = null;
            t.userm_id = null;
            t.userm = null;
            t.dtm = null;

            return t;

          } else {
            // 3. Редактирование заявки
            return res.json().data as Transportation;
          }
        })
        .catch(this.handleError);
    }
  }

  getStat(id: number): Promise<Stat[]> {
    const url = `${this.transportationsUrl}/stat${id}`;

    return this.http.get(url)
        .toPromise()
        .then(res => res.json().data as Stat[])
        .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.transportationsUrl}/${id}`;

    return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(res => this.parseResponseJson(res))
        .catch(this.handleError);
  }

  create(transportation: Transportation): Promise<Transportation> {
    return this.http
        .post(this.transportationsUrl, JSON.stringify(transportation), {headers: this.headers})
        .toPromise()
        .then(res => this.parseResponseJson(res).data as Transportation)
        .catch(this.handleError);
  }

  update(transportation: Transportation): Promise<Transportation> {
    const url = `${this.transportationsUrl}/${transportation.id}`;

    return this.http
        .put(url, JSON.stringify(transportation), {headers: this.headers})
        .toPromise()
        .then((res) => this.parseResponseJson(res).data as Transportation)
        .catch(this.handleError);
  }
}
