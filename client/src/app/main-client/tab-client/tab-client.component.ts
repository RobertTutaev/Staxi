import 'rxjs/add/operator/switchMap';
import { Location }               from '@angular/common';

import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Client } from '../../_classes/client';
import { ClientService } from '../../_services/client.service';

@Component({
  selector: 'tab-client',
  templateUrl: './tab-client.component.html',
  styleUrls: ['./tab-client.component.sass']
})
export class TabClientComponent implements OnInit {

  client: Client = new Client();
  id: number;
  
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
        .then(() => this.gotoBack());
  }

  gotoBack() {
    console.log(this.location.path());
    this.location.back();
  }
}