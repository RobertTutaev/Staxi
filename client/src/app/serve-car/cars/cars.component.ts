import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Car } from '../../_classes/car';
import { CarService } from '../../_services/car.service';

@Component({
  selector: 'car-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.sass']
})
export class CarsComponent implements OnInit {
  cars: Car[] = [];
  
  constructor(private carService: CarService,
              private router: Router) { }
  
  ngOnInit() {
    this.carService.getCars().then((cars: Car[]) => this.cars = cars);
  }

  onSelect(car: Car) {
    this.router.navigate(['/car', car.id]);
  }

  onDelete(car: Car) {
    if(confirm('Вы действительно хотите удалить текущую запись и все связанные с ней записи из базы данных?'))
      this.carService.delete(car.id)
        .then(() => {
            this.cars = this.cars.filter(c => c !== car);
          });
  }
}
