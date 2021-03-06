import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { Reason } from '../_classes/list/reason';

@Injectable()
export class ReasonService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private docsUrl = environment.myEndpoint + 'api/reason';

  constructor(private http: Http) {}

  getReasons(): Promise<Reason[]> {
    return this.http.get(this.docsUrl)
        .toPromise()
        .then(res => res.json().data as Reason[])
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
