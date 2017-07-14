import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { Doc } from '../_classes/list/doc';

@Injectable()
export class DocService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private docsUrl = environment.myEndpoint + 'api/doc';

  constructor(private http: Http) {}

  getDocs(): Promise<Doc[]> {
    return this.http.get(this.docsUrl)
               .toPromise()
               .then(response => response.json().data as Doc[])
               .catch(this.handleError);
  }

  getDoc(id: number): Promise<Doc> {
    if (!id) {
      const promise: Promise<Doc> = new Promise(() => new Doc());

      return promise.then();      
    } else {
      const url = `${this.docsUrl}/${id}`;

      return this.http.get(url)
        .toPromise()
        .then(response => response.json().data as Doc)
        .catch(this.handleError);
    }
  }

  delete(id: number): Promise<void> {
    const url = `${this.docsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  create(doc: Doc): Promise<Doc> {
    return this.http
      .post(this.docsUrl, JSON.stringify(doc), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Doc)
      .catch(this.handleError);
  }

  update(doc: Doc): Promise<Doc> {
    const url = `${this.docsUrl}/${doc.id}`;
    return this.http
      .put(url, JSON.stringify(doc), {headers: this.headers})
      .toPromise()
      .then(() => doc)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}