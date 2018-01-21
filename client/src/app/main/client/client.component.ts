import 'rxjs/add/operator/switchMap';
import { Location } from '@angular/common';

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Reason } from '../../_classes/list/reason';
import { ReasonService } from '../../_services/reason.service';
import { Client } from '../../_classes/list/client';
import { ClientService } from '../../_services/client.service';

@Component({
  selector: 'client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.sass']
})
export class ClientComponent implements OnInit {

  reasons: Reason[] = [];
  client: Client = new Client();
  id: number;

  constructor(private reasonService: ReasonService,
              private clientService: ClientService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) { }

  ngOnInit() {
    this.reasonService.getReasons().then((reasons: Reason[]) => {
        this.reasons = reasons;
        this.route.params
          .switchMap((params: Params) => {
            this.id = +params['id'];
            return this.clientService.getClient(this.id);
          })
          .subscribe((client: Client) => {
            this.client = client;
          });
    });
  }

  onSubmit() {
    if (this.client.id) {
      this.clientService.update(this.client)
        .then(() => this.location.back());
    } else {
      this.clientService.create(this.client)
        .then((client: Client) => this.router.navigate(['/client', client.id], { relativeTo: this.route }));
    }
  }

  get selectedReasonId(): number {
    return this.client.reason_id;
  }

  set selectedReasonId(value: number) {
    this.client.reason_id = value;
  }

  gotoBack() {
    this.location.back();
  }
}
