import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { Contact } from '../_classes/list/contact';

@Injectable() 
export class ContactService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private contactsUrl = environment.myEndpoint + 'api/contact';

  constructor(private http: Http) {}

  getContacts(id: number): Promise<Contact[]> {
    const url = `${this.contactsUrl}/c${id}`;

    return this.http.get(url)
               .toPromise()
               .then(response => response.json().data as Contact[])
               .catch(this.handleError);
  }

  getContact(id: number): Promise<Contact> {
    if (!id) {
      const promise = new Promise(() => new Contact());

      return promise.then();      
    } else {
      const url = `${this.contactsUrl}/${id}`;

      return this.http.get(url)
        .toPromise()
        .then(response => response.json().data as Contact)
        .catch(this.handleError);
    }
  }

  delete(id: number): Promise<void> {
    const url = `${this.contactsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(contact: Contact): Promise<Contact> {
    return this.http
      .post(this.contactsUrl, JSON.stringify(contact), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Contact)
      .catch(this.handleError);
  }

  update(contact: Contact): Promise<Contact> {
    const url = `${this.contactsUrl}/${contact.id}`;
    return this.http
      .put(url, JSON.stringify(contact), {headers: this.headers})
      .toPromise()
      .then(() => contact)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}