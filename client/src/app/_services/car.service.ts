import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { Car } from '../_classes/list/car';

@Injectable()
export class CarService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private carsUrl = environment.myEndpoint + 'api/car';

  constructor(private http: Http) {}

  getCars(checkStatus: boolean = false): Promise<Car[]> {
    const url = `${this.carsUrl}/c${+checkStatus}`;
    return this.http.get(url)
               .toPromise()
               .then(response => response.json().data as Car[])
               .catch(this.handleError);
  }

  getCar(id: number): Promise<Car> {
    if (!id) {
      const promise: Promise<Car> = new Promise(() => new Car());

      return promise.then();
    } else {
      const url = `${this.carsUrl}/${id}`;

      return this.http.get(url)
        .toPromise()
        .then(response => response.json().data as Car)
        .catch(this.handleError);
    }
  }

  delete(id: number): Promise<void> {
    const url = `${this.carsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  create(car: Car): Promise<Car> {
    return this.http
      .post(this.carsUrl, JSON.stringify(car), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Car)
      .catch(this.handleError);
  }

  update(car: Car): Promise<Car> {
    const url = `${this.carsUrl}/${car.id}`;
    return this.http
      .put(url, JSON.stringify(car), {headers: this.headers})
      .toPromise()
      .then(() => car)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
