import 'rxjs/add/operator/switchMap';
import { Location }               from '@angular/common';

import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Firm } from '../../_classes/list/firm';
import { FirmService } from '../../_services/firm.service';
import { Car } from '../../_classes/list/car';
import { CarService } from '../../_services/car.service';

@Component({
  selector: 'car-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.sass']
})
export class CarComponent implements OnInit {
  firms: Firm[] = []; 
  car: Car = new Car(); 
  
  constructor(private firmService: FirmService,
              private carService: CarService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) { }
  
  ngOnInit() {
    this.firmService.getFirms().then((firms: Firm[]) => {
        this.firms = firms;
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

  get selectedFirmId(): number {
    return this.car.firm_id;
  }

  set selectedFirmId(value: number) {
    this.car.firm_id = value;
  }

  gotoBack() {
    this.location.back();
  }
}