import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { Status } from '../_classes/list/status';

@Injectable()
export class StatusService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private docsUrl = environment.myEndpoint + 'api/status';

  constructor(private http: Http) {}

  getStatuses(): Promise<Status[]> {
    return this.http.get(this.docsUrl)
        .toPromise()
        .then(res => res.json().data as Status[])
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
