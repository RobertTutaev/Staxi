import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { KategsComponent }    from './kategs/kategs.component';
import { KategComponent }  from './kateg/kateg.component';
import { AuthGuard }    from './../_services/auth-guard.service';

const kategsRoutes: Routes = [
  { 
    path: 'kateg',
    canActivate: [AuthGuard], 
    children: [
      { path: 'list', component: KategsComponent },
      { path: '', component: KategComponent },
      { path: ':id', component: KategComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(kategsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ServeKategRoutingModule { }
