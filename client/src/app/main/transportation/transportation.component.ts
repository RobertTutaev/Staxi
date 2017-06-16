import 'rxjs/add/operator/switchMap';
import { Location }               from '@angular/common';

import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Car } from '../../_classes/car';
import { CarService } from '../../_services/car.service';
import { Punkt } from '../../_classes/punkt';
import { PunktService } from '../../_services/punkt.service';
import { Street } from '../../_classes/street';
import { StreetService } from '../../_services/street.service';
import { Transportation } from '../../_classes/transportation';
import { TransportationService } from '../../_services/transportation.service';

import { MdDatepicker } from '@angular/material';

@Component({
  selector: 'transportation',
  templateUrl: './transportation.component.html',
  styleUrls: ['./transportation.component.sass']
})
export class TransportationComponent implements OnInit {
  dt: string = '01.01.2000';

  cars: Car[] = [];
  punkts: Punkt[] = [];
  streets: Street[] = [];
  transportation: Transportation = new Transportation();
  
  constructor(private carService: CarService,
              private punktService: PunktService,
              private streetService: StreetService,
              private transportationService: TransportationService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) { }
  
  ngOnInit() {
    this.carService.getCars().then((cars: Car[]) => {
        this.cars = cars;
    });

    this.punktService.getPunkts().then((punkts: Punkt[]) => {
        this.punkts = punkts;
    });

    this.streetService.getStreets().then((streets: Street[]) => {
        this.streets = streets;
    });

    this.route.params
      .switchMap((params: Params) => this.transportationService.getTransportation(+params['idc']))
      .subscribe((transportation: Transportation) => {
        this.transportation = transportation;
    });
  }

  onSubmit() {
    this.route.parent.parent.params
      .subscribe((params: Params) => {
        const client_id = +params['id'];

        if (this.transportation.id) {
          if (this.transportation.client_id === client_id)
            this.transportationService.update(this.transportation)
              .then(() => this.gotoBack())
          else
            this.gotoBack();
        }
        else {
          this.transportation.client_id = client_id;
          this.transportationService.create(this.transportation)
            .then(() => this.gotoBack());
        }
      });
  }

  get selectedCarsId(): number {
    return this.transportation.car_id;
  }

  set selectedCarId(value: number) {
    this.transportation.car_id = value;
  }

  get selectedPunktId(): number {
    return this.transportation.punkt_id;
  }

  set selectedPunktId(value: number) {
    this.transportation.punkt_id = value;
  }

  get selectedAStreetId(): number {
    return this.transportation.a_street_id;
  }

  set selectedAStreetId(value: number) {
    this.transportation.a_street_id = value;
  }

  get selectedBStreetId(): number {
    return this.transportation.b_street_id;
  }

  set selectedBStreetId(value: number) {
    this.transportation.b_street_id = value;
  }

  gotoBack() {
    this.location.back();
  }
}