import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StreetsComponent }    from './streets/streets.component';
import { StreetComponent }  from './street/street.component';

const streetsRoutes: Routes = [
  { path: 'street/list',  component: StreetsComponent },
  { path: 'street', component: StreetComponent },
  { path: 'street/:id', component: StreetComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(streetsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ServeStreetRoutingModule { }
