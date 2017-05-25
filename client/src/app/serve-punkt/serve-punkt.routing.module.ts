import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PunktsComponent }    from './punkts/punkts.component';
import { PunktComponent }  from './punkt/punkt.component';

const punktsRoutes: Routes = [
  { path: 'punkt/list',  component: PunktsComponent },
  { path: 'punkt', component: PunktComponent },
  { path: 'punkt/:id', component: PunktComponent }
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
