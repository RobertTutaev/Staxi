import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { Type } from '../_classes/list/type';

@Injectable()
export class TypeService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private typesUrl = environment.myEndpoint + 'api/type';

  constructor(private http: Http) {}

  getTypes(): Promise<Type[]> {
    return this.http.get(this.typesUrl)
               .toPromise()
               .then(response => response.json().data as Type[])
               .catch(this.handleError);
  }

  getType(id: number): Promise<Type> {
    if (!id) {
      const promise: Promise<Type> = new Promise(() => new Type());

      return promise.then();      
    } else {
      const url = `${this.typesUrl}/${id}`;

      return this.http.get(url)
        .toPromise()
        .then(response => response.json().data as Type)
        .catch(this.handleError);
    }
  }

  delete(id: number): Promise<void> {
    const url = `${this.typesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  create(type: Type): Promise<Type> {
    return this.http
      .post(this.typesUrl, JSON.stringify(type), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Type)
      .catch(this.handleError);
  }

  update(type: Type): Promise<Type> {
    const url = `${this.typesUrl}/${type.id}`;
    return this.http
      .put(url, JSON.stringify(type), {headers: this.headers})
      .toPromise()
      .then(() => type)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}