import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { B } from '../_classes/list/b';
import { Transportation } from '../_classes/list/transportation';
import { AReport } from '../_classes/report/a.report';
import { BReport } from '../_classes/report/b.report';

@Injectable()
export class ReportService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private transportationsUrl = environment.myEndpoint + 'api/report';

  constructor(private http: Http) {}

  getA(aReport: AReport): Promise<Transportation[]> {
    const url = `${this.transportationsUrl}/a${aReport.getUrlValue()}`;
    
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Transportation[])
      .catch(this.handleError);
  }

  getB(bReport: BReport): Promise<B[]> {
    const url = `${this.transportationsUrl}/b${bReport.getUrlValue()}`;
    
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as B[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
