import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TypesComponent }    from './types/types.component';
import { TypeComponent }  from './type/type.component';

const typesRoutes: Routes = [
  { path: 'type/list',  component: TypesComponent },
  { path: 'type', component: TypeComponent },
  { path: 'type/:id', component: TypeComponent }
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
