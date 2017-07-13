import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StreetsComponent }    from './streets/streets.component';
import { StreetComponent }  from './street/street.component';
import { AuthGuard }    from './../_services/auth-guard.service';

const streetsRoutes: Routes = [
  { 
    path: 'street',
    canActivate: [AuthGuard], 
    children: [
      { path: 'list', component: StreetsComponent },
      { path: '', component: StreetComponent },
      { path: ':id', component: StreetComponent }
    ]
  }
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
