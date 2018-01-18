import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CarsComponent } from './cars/cars.component';
import { CarComponent } from './car/car.component';
import { AuthGuard } from './../_services/auth-guard.service';

const carsRoutes: Routes = [
  {
    path: 'car',
    canActivate: [AuthGuard],
    children: [
      { path: 'list', component: CarsComponent },
      { path: '', component: CarComponent },
      { path: ':id', component: CarComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(carsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ServeCarRoutingModule { }
