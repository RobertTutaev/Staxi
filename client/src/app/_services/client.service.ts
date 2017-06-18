import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { Client } from '../_classes/list/client';

@Injectable() 
export class ClientService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private clientsUrl = environment.myEndpoint + 'api/client';

  constructor(private http: Http) {}

  getClients(): Promise<Client[]> {
    return this.http.get(this.clientsUrl)
               .toPromise()
               .then(response => response.json().data as Client[])
               .catch(this.handleError);
  }

  getClient(id: number): Promise<Client> {
    if (!id) {
      const promise = new Promise(() => new Client());

      return promise.then();      
    } else {
      const url = `${this.clientsUrl}/${id}`;

      return this.http.get(url)
        .toPromise()
        .then(response => response.json().data as Client)
        .catch(this.handleError);
    }
  }

  delete(id: number): Promise<void> {
    const url = `${this.clientsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(client: Client): Promise<Client> {
    return this.http
      .post(this.clientsUrl, JSON.stringify(client), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Client)
      .catch(this.handleError);
  }

  update(client: Client): Promise<Client> {
    const url = `${this.clientsUrl}/${client.id}`;
    return this.http
      .put(url, JSON.stringify(client), {headers: this.headers})
      .toPromise()
      .then(() => client)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}