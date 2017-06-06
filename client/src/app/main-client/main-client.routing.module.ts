import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientsComponent }    from './clients/clients.component';
import { ClientComponent }  from './client/client.component';
import { TabClientComponent }  from './tab-client/tab-client.component';
import { TabContactComponent }  from './tab-contact/tab-contact.component';
import { TabContactsComponent }  from './tab-contacts/tab-contacts.component';

const clientsRoutes: Routes = [
  { path: 'client/list',  component: ClientsComponent },
  { path: 'client', component: ClientComponent },
  { path: 'client/:id', component: ClientComponent, children: [

      { path: '', component: TabClientComponent },
      { path: 'contact/list', component: TabContactsComponent },
      { path: 'contact/:idc', component: TabContactComponent },
      { path: 'contact', component: TabContactComponent }
    ]
  }  
];

@NgModule({
  imports: [
    RouterModule.forChild(clientsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MainClientRoutingModule { }
