import { Injectable } from '@angular/core';
import { Headers, Http, ResponseContentType } from '@angular/http';
import { environment } from '../../environments/environment';
import { B } from '../_classes/list/b';
import { Transportation } from '../_classes/list/transportation';
import { AReport } from '../_classes/report/a.report';
import { BReport } from '../_classes/report/b.report';
import * as moment from 'moment';
import * as FileSaver from 'file-saver';

@Injectable()
export class ReportService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private transportationsUrl = environment.myEndpoint + 'api/report';

  constructor(private http: Http) {}

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

  private saveAsBlob(data: any, type: string) {
      const dt = new Date();      
      const blob = new Blob([data._body],
          { type: 'application/vnd.ms-excel' });
      const file = new File([blob], `report_${type}_${moment(dt).format('YYYY.MM.DD.hh.mm.ss')}.xlsx`,
          { type: 'application/vnd.ms-excel' });
  
      FileSaver.saveAs(file);
  }
  
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
