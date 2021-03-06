import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { User } from '../_classes/list/user';

@Injectable()
export class UserService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private usersUrl = environment.myEndpoint + 'api/user';

  constructor(private http: Http) {}

  getUsers(): Promise<User[]> {
    return this.http.get(this.usersUrl)
        .toPromise()
        .then(res => res.json().data as User[])
        .catch(this.handleError);
  }

  getUser(id: number): Promise<User> {
    if (!id) {
      return Promise.resolve(new User());
    } else {
      const url = `${this.usersUrl}/${id}`;

      return this.http.get(url)
          .toPromise()
          .then(res => res.json().data as User)
          .catch(this.handleError);
    }
  }

  delete(id: number): Promise<void> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(res => res.json())
        .catch(this.handleError);
  }

  create(user: User): Promise<User> {
    return this.http
        .post(this.usersUrl, JSON.stringify(user), {headers: this.headers})
        .toPromise()
        .then(res => res.json().data as User)
        .catch(this.handleError);
  }

  update(user: User): Promise<User> {
    const url = `${this.usersUrl}/${user.id}`;

    return this.http
        .put(url, JSON.stringify(user), {headers: this.headers})
        .toPromise()
        .then(() => user)
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
