import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Cd } from '../../_classes/list/cd';
import { CReport } from '../../_classes/report/c.report';
import 'rxjs/add/operator/map';

/*
  Generated class for the ReportProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ReportProvider {
  private reportUrl = 'api/report';

  constructor(private http: Http) { }

  getCd(cReport: CReport): Promise<Cd[]> {
    cReport.getFile = 0;
    const url = `${this.reportUrl}/cd${cReport.getUrlValue()}`;
    
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Cd[])
      .catch(this.handleError);
  }

  protected handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}