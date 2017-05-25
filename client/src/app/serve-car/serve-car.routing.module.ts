import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CarsComponent }    from './cars/cars.component';
import { CarComponent }  from './car/car.component';

const carsRoutes: Routes = [
  { path: 'car/list',  component: CarsComponent },
  { path: 'car', component: CarComponent },
  { path: 'car/:id', component: CarComponent }
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
