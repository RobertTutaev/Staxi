import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Client } from '../../_classes/list/client';
import { ClientService } from '../../_services/client.service';
import { SController } from '../../_classes/s.controller';

@Component({
  selector: 'client-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.sass']
})
export class ClientsComponent extends SController implements OnInit {
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
    if(confirm('Вы действительно хотите удалить текущую запись и все связанные с ней записи из базы данных?'))
      this.clientService.delete(client.id)
        .then(() => {
            this.clients = this.clients.filter(c => c !== client);
          });
  }
}
