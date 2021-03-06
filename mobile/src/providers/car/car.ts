import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';  
import { Car } from '../../_classes/list/car';
import { ENV } from '@environment';

/*
  Generated class for the CarProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CarProvider {
  private carsUrl = `${ENV.API_ENDPOINT}/api/car`;

  constructor(public http: Http) { }
  
  getCarsD(checkStatus: boolean = false): Promise<Car[]> {
    const url = `${this.carsUrl}/d${+checkStatus}`;

    return this.http.get(url)
        .toPromise()
        .then(res => res.json().data as Car[])
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}