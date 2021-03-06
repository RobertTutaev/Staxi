import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CarsComponent } from './cars/cars.component';
import { CarComponent } from './car/car.component';
import { CarService } from '../_services/car.service';
import { ServeCarRoutingModule } from './serve-car.routing.module';
import { ToolsModule } from '../tools/tools.module';

@NgModule({
  imports: [
    ToolsModule,
    CommonModule,
    FormsModule,
    ServeCarRoutingModule
  ],
  declarations: [
    CarsComponent,
    CarComponent
  ],
  providers: [ CarService ]
})
export class ServeCarModule {}
