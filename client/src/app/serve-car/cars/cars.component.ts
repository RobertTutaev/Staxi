import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Car } from '../../_classes/list/car';
import { CarService } from '../../_services/car.service';
import { SController } from '../../_classes/s.controller';

@Component({
  selector: 'car-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.sass']
})
export class CarsComponent extends SController implements OnInit {
  cars: Car[] = [];
  
  constructor(private carService: CarService,
              private router: Router) { super(); }
  
  ngOnInit() {
    this.carService.getCars().then((cars: Car[]) => this.cars = cars);
  }

  onSelect(car: Car) {
    this.router.navigate(['/car', car.id]);
  }

  onDelete(car: Car) {
    if(confirm('Вы действительно хотите удалить текущую запись?'))
      this.carService.delete(car.id)
        .then((res: any) => res.rslt ? this.cars = this.cars.filter(k => k !== car) : null);
  }
}