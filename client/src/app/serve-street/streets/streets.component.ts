import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Street } from '../../_classes/list/street';
import { StreetService } from '../../_services/street.service';
import { SController } from '../../_classes/s.controller';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'street-streets',
  templateUrl: './streets.component.html',
  styleUrls: ['./streets.component.sass']
})
export class StreetsComponent extends SController implements OnInit {
  searchText: string = '';
  streets: Observable<Street[]>;
  private searchTerms: Subject<string> = new Subject<string>();

  constructor(private streetService: StreetService,
              private router: Router) { super(); }

  ngOnInit() {
    this.streets = this.searchTerms
      .debounceTime(600)          // wait 300ms after each keystroke before considering the term
      //.distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term     // switch to new observable each time the term changes
        // return the http search observable
        ? this.streetService.search(term)
        // or the observable of empty heroes if there was no search term
        : Observable.of<Street[]>([]))
      .catch(error => Observable.of<Street[]>([]));
  }

  searchStreet(term: string) {
    this.searchTerms.next(term);
  }

  onSelect(street: Street) {
    this.router.navigate(['/street', street.id]);
  }

  onDelete(street: Street) {
    if (confirm('Вы действительно хотите удалить текущую запись?')) {
      this.streetService.delete(street.id)
        .then((res: any) => res.rslt ? this.searchTerms.next(this.searchText) : null);
    }
  }
}
