import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Client } from '../../_classes/list/client';
import { ClientService } from '../../_services/client.service';
import { SController } from '../../_classes/s.controller';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.sass']
})
export class ClientsComponent extends SController implements OnInit {
  searchText: string = '';  
  clients: Observable<Client[]>;
  private searchTerms: Subject<string> = new Subject<string>();

  constructor(private clientService: ClientService,
              private router: Router) { super(); }

  ngOnInit() {
    this.clients = this.searchTerms
      .debounceTime(600)        // wait 300ms after each keystroke before considering the term
      //.distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.clientService.search(term)
        // or the observable of empty heroes if there was no search term
        : Observable.of<Client[]>([]))
      .catch(error => Observable.of<Client[]>([]));
  }
  
  searchClient(term: string) {
    this.searchTerms.next(term);
  }

  onSelect(client: Client) {
    this.router.navigate(['/client', client.id]);
  }

  onDelete(client: Client) {
    if(confirm('Вы действительно хотите удалить текущую запись?'))
      this.clientService.delete(client.id)
        .then((res: any) => res.rslt ? this.searchTerms.next(this.searchText) : null);
  }
}