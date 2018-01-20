import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class InformedService {

  private informed: string;
  private subject: Subject<string> = new Subject<string>();

  setInformed(informed: string): void {
    this.informed = informed;
    this.subject.next(informed);
  }

  getInformed(): Observable<string> {
    return this.subject.asObservable();
  }
}
