import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TerritoriesComponent }    from './territories/territories.component';
import { TerritoryComponent }  from './territory/territory.component';

const territoriesRoutes: Routes = [
  { path: 'territory/list',  component: TerritoriesComponent },
  { path: 'territory', component: TerritoryComponent },
  { path: 'territory/:id', component: TerritoryComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(territoriesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ServeTerritoryRoutingModule { }
