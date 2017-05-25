import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientsComponent }    from './clients/clients.component';
import { ClientComponent }  from './client/client.component';

const clientsRoutes: Routes = [
  { path: 'client/list',  component: ClientsComponent },
  { path: 'client', component: ClientComponent },
  { path: 'client/:id', component: ClientComponent }
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
