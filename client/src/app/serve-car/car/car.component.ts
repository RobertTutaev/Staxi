import 'rxjs/add/operator/switchMap';
import { Location }               from '@angular/common';

import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Territory } from '../../_classes/territory';
import { TerritoryService } from '../../_services/territory.service';
import { Car } from '../../_classes/car';
import { CarService } from '../../_services/car.service';

@Component({
  selector: 'car-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.sass']
})
export class CarComponent implements OnInit {
  territories: Territory[] = []; 
  car: Car = new Car(); 
  
  constructor(private territoryService: TerritoryService,
              private carService: CarService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) { }
  
  ngOnInit() {
    this.territoryService.getTerritories().then((territories: Territory[]) => {
        this.territories = territories;
        this.route.params     
          .switchMap((params: Params) => this.carService.getCar(+params['id']))
          .subscribe((car: Car) => this.car = car);
      });
  }

  onSubmit() {
    if (this.car.id)
      this.carService.update(this.car)
        .then(() => this.gotoBack());
    else 
      this.carService.create(this.car)
        .then(() => this.gotoBack());
  }

  get selectedTerritoryId(): number {
    return this.car.territory_id;
  }

  set selectedTerritoryId(value: number) {
    this.car.territory_id = value;
  } 

  gotoBack() {
    this.location.back();
  }
}