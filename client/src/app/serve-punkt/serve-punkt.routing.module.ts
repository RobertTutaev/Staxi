import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PunktsComponent }    from './punkts/punkts.component';
import { PunktComponent }  from './punkt/punkt.component';
import { AuthGuard }    from './../_services/auth-guard.service';

const punktsRoutes: Routes = [
  { 
    path: 'punkt',
    canActivate: [AuthGuard], 
    children: [
      { path: 'list', component: PunktsComponent },
      { path: '', component: PunktComponent },
      { path: ':id', component: PunktComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(punktsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ServePunktRoutingModule { }
