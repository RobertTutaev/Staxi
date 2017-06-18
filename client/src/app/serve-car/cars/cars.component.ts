import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Territory } from '../../_classes/list/territory';
import { TerritoryService } from '../../_services/territory.service';

import { Car } from '../../_classes/list/car';
import { CarService } from '../../_services/car.service';

@Component({
  selector: 'car-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.sass']
})
export class CarsComponent implements OnInit {
  cars: Car[] = [];
  territories: Territory[] = [];
  
  constructor(private territoryService: TerritoryService,
              private carService: CarService,
              private router: Router) { }
  
  ngOnInit() {
    this.territoryService.getTerritories().then((territories: Territory[]) => {
      this.territories = territories;
      this.carService.getCars().then((cars: Car[]) => this.cars = cars);
    })    
  }

  onSelect(car: Car) {
    this.router.navigate(['/car', car.id]);
  }

  getTerritoryName(car: Car): string {
    return this.territories.find(myObj => myObj.id === car.territory_id).name;
  }

  onDelete(car: Car) {
    if(confirm('Вы действительно хотите удалить текущую запись и все связанные с ней записи из базы данных?'))
      this.carService.delete(car.id)
        .then(() => {
            this.cars = this.cars.filter(c => c !== car);
          });
  }
}
