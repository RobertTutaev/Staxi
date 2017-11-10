import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { Kateg } from '../_classes/list/kateg';

@Injectable()
export class KategService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private kategsUrl = environment.myEndpoint + 'api/kateg';

  constructor(private http: Http) {}

  getKategs(checkStatus: boolean = false): Promise<Kateg[]> {
    return this.http.get(`${this.kategsUrl}/c${+checkStatus}`)
      .toPromise()
      .then(response => response.json().data as Kateg[])
      .catch(this.handleError);
  }

  getKateg(id: number): Promise<Kateg> {
    if (!id) {
      const promise: Promise<Kateg> = new Promise(() => new Kateg());

      return promise.then();      
    } else {
      const url = `${this.kategsUrl}/${id}`;

      return this.http.get(url)
        .toPromise()
        .then(response => response.json().data as Kateg)
        .catch(this.handleError);
    }
  }

  delete(id: number): Promise<void> {
    const url = `${this.kategsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  create(kateg: Kateg): Promise<Kateg> {
    return this.http
      .post(this.kategsUrl, JSON.stringify(kateg), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Kateg)
      .catch(this.handleError);
  }

  update(kateg: Kateg): Promise<Kateg> {
    const url = `${this.kategsUrl}/${kateg.id}`;
    return this.http
      .put(url, JSON.stringify(kateg), {headers: this.headers})
      .toPromise()
      .then(() => kateg)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}