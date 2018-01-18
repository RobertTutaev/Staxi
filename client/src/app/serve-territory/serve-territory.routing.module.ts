import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TerritoriesComponent } from './territories/territories.component';
import { TerritoryComponent } from './territory/territory.component';
import { AuthGuard } from './../_services/auth-guard.service';

const territoriesRoutes: Routes = [
  {
    path: 'territory',
    canActivate: [AuthGuard],
    children: [
      { path: 'list', component: TerritoriesComponent },
      { path: '', component: TerritoryComponent },
      { path: ':id', component: TerritoryComponent }
    ]
  }
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
