import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { KategsComponent }    from './kategs/kategs.component';
import { KategComponent }  from './kateg/kateg.component';

const kategsRoutes: Routes = [
  { path: 'kateg/list',  component: KategsComponent },
  { path: 'kateg', component: KategComponent },
  { path: 'kateg/:id', component: KategComponent }
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
