import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Client } from '../../_classes/client';
import { ClientService } from '../../_services/client.service';

@Component({
  selector: 'client-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.sass']
})
export class ClientsComponent implements OnInit {
  clients: Client[] = [];
  
  constructor(private clientService: ClientService,
              private router: Router) { }
  
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
