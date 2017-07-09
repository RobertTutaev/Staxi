import 'rxjs/add/operator/switchMap';
import { Location }               from '@angular/common';

import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Client } from '../../_classes/list/client';
import { ClientService } from '../../_services/client.service';

@Component({
  selector: 'client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.sass']
})
export class ClientComponent implements OnInit {

  client: Client = new Client();
  id: number;
  mask = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, ' ', /\d/, /\d/];
  unmask(val) {
    return val.replace('/\D+/g', '');
  }
  
  constructor(private clientService: ClientService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) { }
  
  ngOnInit() {    
    this.route.params     
        .switchMap((params: Params) => {
          this.id = +params['id'];
          return this.clientService.getClient(this.id);
        })
        .subscribe((client: Client) => {
            this.client = client;
          });
  }

  onSubmit() {
    if (this.client.id)
      this.clientService.update(this.client)
        .then(() => this.gotoBack());
    else 
      this.clientService.create(this.client)
        .then((client: Client) => this.router.navigate(['/client', client.id], { relativeTo: this.route }));
  }

  gotoBack() {
    this.location.back();
  }
}