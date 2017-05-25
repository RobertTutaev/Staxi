import 'rxjs/add/operator/switchMap';
import { Location }               from '@angular/common';

import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Car } from '../../_classes/car';
import { CarService } from '../../_services/car.service';

@Component({
  selector: 'car-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.sass']
})
export class CarComponent implements OnInit {
  car: Car = new Car(); 
  
  constructor(private carService: CarService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) { }
  
  ngOnInit() {
    this.route.params     
      // (+) converts string 'id' to a number
      .switchMap((params: Params) => this.carService.getCar(+params['id']))
      .subscribe((car: Car) => this.car = car);
  }

  onSubmit() {
    if (this.car.id)
      this.carService.update(this.car)
        .then(() => this.gotoBack());
    else 
      this.carService.create(this.car)
        .then(() => this.gotoBack());
  }  

  gotoBack() {
    console.log(this.location.path());
    this.location.back();
  }
}