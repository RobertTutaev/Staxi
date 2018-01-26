import { Injectable } from '@angular/core';
import { Headers, Http, ResponseContentType } from '@angular/http';
import { environment } from '../../environments/environment';
import { B } from '../_classes/list/b';
import { C } from '../_classes/list/c';
import { D } from '../_classes/list/d';
import { Transportation } from '../_classes/list/transportation';
import { AReport } from '../_classes/report/a.report';
import { BReport } from '../_classes/report/b.report';
import { CReport } from '../_classes/report/c.report';
import { DReport } from '../_classes/report/d.report';
import { RService } from '../_classes/r.service';
import { InformedService } from '../_services/informed.service';

@Injectable()
export class ReportService extends RService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private transportationsUrl = environment.myEndpoint + 'api/report';

  constructor(private http: Http,
              is: InformedService) { super(is); }

  getA(aReport: AReport): Promise<Transportation[]> {
    aReport.getFile = 0;
    const url = `${this.transportationsUrl}/a${aReport.getUrlValue()}`;

    return this.http.get(url)
        .toPromise()
        .then(res => res.json().data as Transportation[])
        .catch(this.handleError);
  }

  getAFile(aReport: AReport) {
    aReport.getFile = 1;
    const url = `${this.transportationsUrl}/a${aReport.getUrlValue()}`;

    return this.http.get(url, {
            headers: this.headers,
            responseType: ResponseContentType.Blob
        })
        .toPromise()
        .then(res => this.saveAsBlobExcel(res, 'a'))
        .catch(error => this.handleError(error));
  }

  getB(bReport: BReport): Promise<B[]> {
    bReport.getFile = 0;
    const url = `${this.transportationsUrl}/b${bReport.getUrlValue()}`;

    return this.http.get(url)
        .toPromise()
        .then(res => res.json().data as B[])
        .catch(this.handleError);
  }

  getBFile(bReport: BReport) {
    bReport.getFile = 1;
    const url = `${this.transportationsUrl}/b${bReport.getUrlValue()}`;

    return this.http.get(url, {
            headers: this.headers,
            responseType: ResponseContentType.Blob
        })
        .toPromise()
        .then(res => this.saveAsBlobExcel(res, 'b'))
        .catch(error => this.handleError(error));
  }

  getC(cReport: CReport): Promise<C[]> {
    cReport.getFile = 0;
    const url = `${this.transportationsUrl}/c${cReport.getUrlValue()}`;

    return this.http.get(url)
        .toPromise()
        .then(res => res.json().data as C[])
        .catch(this.handleError);
  }

  getCFile(cReport: CReport) {
    cReport.getFile = 1;
    const url = `${this.transportationsUrl}/c${cReport.getUrlValue()}`;

    return this.http.get(url, {
            headers: this.headers,
            responseType: ResponseContentType.Blob
        })
        .toPromise()
        .then(res => this.saveAsBlobExcel(res, 'c'))
        .catch(error => this.handleError(error));
  }

  getD(dReport: DReport): Promise<D[]> {
    dReport.getFile = 0;
    const url = `${this.transportationsUrl}/d${dReport.getUrlValue()}`;

    return this.http.get(url)
        .toPromise()
        .then(res => res.json().data as D[])
        .catch(this.handleError);
  }

  getDFile(dReport: DReport) {
    dReport.getFile = 1;
    const url = `${this.transportationsUrl}/d${dReport.getUrlValue()}`;

    return this.http.get(url, {
            headers: this.headers,
            responseType: ResponseContentType.Blob
        })
        .toPromise()
        .then(res => this.saveAsBlobExcel(res, 'd'))
        .catch(error => this.handleError(error));
  }
}
