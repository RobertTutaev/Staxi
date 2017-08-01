import { Injectable } from '@angular/core';
import { Headers, Http, ResponseContentType } from '@angular/http';
import { environment } from '../../environments/environment';
import { B } from '../_classes/list/b';
import { Transportation } from '../_classes/list/transportation';
import { AReport } from '../_classes/report/a.report';
import { BReport } from '../_classes/report/b.report';
import { RService } from '../_classes/r.service';

@Injectable()
export class ReportService extends RService{

  private headers = new Headers({'Content-Type': 'application/json'});
  private transportationsUrl = environment.myEndpoint + 'api/report';

  constructor(private http: Http) { super(); }

  getA(aReport: AReport): Promise<Transportation[]> {
    aReport.getFile = 0;
    const url = `${this.transportationsUrl}/a${aReport.getUrlValue()}`;
    
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Transportation[])
      .catch(this.handleError);
  }

  getAFile(aReport: AReport) {
    aReport.getFile = 1;
    const url = `${this.transportationsUrl}/a${aReport.getUrlValue()}`;

    return this.http.get(url, {
            headers: this.headers,
            params: aReport,
            responseType: ResponseContentType.Blob
        })
        .toPromise()
        .then(response => this.saveAsBlob(response, 'a'))
        .catch(error => this.handleError(error));
  }

  getB(bReport: BReport): Promise<B[]> {
    bReport.getFile = 0;
    const url = `${this.transportationsUrl}/b${bReport.getUrlValue()}`;
    
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as B[])
      .catch(this.handleError);
  }

  getBFile(bReport: BReport) {
    bReport.getFile = 1;
    const url = `${this.transportationsUrl}/b${bReport.getUrlValue()}`;

    return this.http.get(url, {
            headers: this.headers,
            params: bReport,
            responseType: ResponseContentType.Blob
        })
        .toPromise()
        .then(response => this.saveAsBlob(response, 'b'))
        .catch(error => this.handleError(error));
  }
}