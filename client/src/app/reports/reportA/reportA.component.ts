import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Client } from '../../_classes/list/client';
import { ClientService } from '../../_services/client.service';
import { SController } from '../../_classes/s.controller';

@Component({
  selector: 'reports-reportA',
  templateUrl: './reportA.component.html',
  styleUrls: ['./reportA.component.sass']
})
export class ReportAComponent extends SController implements OnInit {
  clients: Client[] = [];
  
  constructor(private clientService: ClientService,
              private router: Router) { super(); }
  
  ngOnInit() {
    this.clientService.getClients().then((clients: Client[]) => this.clients = clients);
  }

  onSelect(client: Client) {
    this.router.navigate(['/client', client.id]);
  }

  onDelete(client: Client) {
    if(confirm('Вы действительно хотите удалить текущую запись?'))
      this.clientService.delete(client.id)
        .then((res: any) => res.rslt ? this.clients = this.clients.filter(k => k !== client) : null);
  }
}