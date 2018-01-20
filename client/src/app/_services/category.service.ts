import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { Category } from '../_classes/list/category';

@Injectable()
export class CategoryService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private categoriesUrl = environment.myEndpoint + 'api/category';

  constructor(private http: Http) {}

  getCategories(id: number): Promise<Category[]> {
    const url = `${this.categoriesUrl}/c${id}`;

    return this.http.get(url)
        .toPromise()
        .then(res => res.json().data as Category[])
        .catch(this.handleError);
  }

  getCategory(id: number): Promise<Category> {
    if (!id) {
      const promise: Promise<Category> = new Promise(() => new Category());

      return promise.then();
    } else {
      const url = `${this.categoriesUrl}/${id}`;

      return this.http.get(url)
        .toPromise()
        .then(res => res.json().data as Category)
        .catch(this.handleError);
    }
  }

  delete(id: number): Promise<void> {
    const url = `${this.categoriesUrl}/${id}`;

    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  create(category: Category): Promise<Category> {
    return this.http
      .post(this.categoriesUrl, JSON.stringify(category), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Category)
      .catch(this.handleError);
  }

  update(category: Category): Promise<Category> {
    const url = `${this.categoriesUrl}/${category.id}`;
    return this.http
      .put(url, JSON.stringify(category), {headers: this.headers})
      .toPromise()
      .then(() => category)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
