import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TypesComponent }    from './types/types.component';
import { TypeComponent }  from './type/type.component';
import { AuthGuard }    from './../_services/auth-guard.service';

const typesRoutes: Routes = [
  { 
    path: 'type', 
    canActivate: [AuthGuard], 
    children: [
      { path: 'list', component: TypesComponent },
      { path: '', component: TypeComponent },
      { path: ':id', component: TypeComponent }      

    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(typesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ServeTypeRoutingModule { }
