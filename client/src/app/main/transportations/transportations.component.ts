import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Car } from '../../_classes/car';
import { CarService } from '../../_services/car.service';
import { Punkt } from '../../_classes/punkt';
import { PunktService } from '../../_services/punkt.service';
import { Street } from '../../_classes/street';
import { StreetService } from '../../_services/street.service';
import { Transportation } from '../../_classes/transportation';
import { TransportationService } from '../../_services/transportation.service';
import { SController } from '../../_classes/s.controller';

@Component({
  selector: 'transportations',
  templateUrl: './transportations.component.html',
  styleUrls: ['./transportations.component.sass']
})
export class TransportationsComponent extends SController implements OnInit {
  cars: Car[] = [];
  punkts: Punkt[] = [];
  streets: Street[] = [];
  transportations: Transportation[] = [];

  constructor(private carService: CarService,
              private punktService: PunktService,
              private streetService: StreetService,
              private transportationService: TransportationService,
              private route: ActivatedRoute,
              private router: Router) { super(); }
  
  ngOnInit() {
    this.carService.getCars().then((cars: Car[]) => this.cars = cars);

    this.punktService.getPunkts().then((punkts: Punkt[]) => this.punkts = punkts);

    this.streetService.getStreets().then((streets: Street[]) => this.streets = streets); 

    this.route.parent.parent.params
      .switchMap((params: Params) => this.transportationService.getTransportations(+params['id']))
      .subscribe((transportations: Transportation[]) => this.transportations = transportations);
  }

  onSelect(transportation: Transportation) {
    this.router.navigate(['../', transportation.id], { relativeTo: this.route });
  }

  getCarName(transportation: Transportation): string {
    return this.cars.find(myObj => myObj.id === transportation.car_id).name;
  }
  
  getPunktName(transportation: Transportation): string {
    return this.punkts.find(myObj => myObj.id === transportation.punkt_id).name;
  }

  getStreetNameSocr(value: number): string {
    const street = this.streets.find(myObj => myObj.id === value);
    return street.socr + ' ' + street.name;
  }

  onDelete(transportation: Transportation) {
    if(confirm('Вы действительно хотите удалить текущую запись и все связанные с ней записи из базы данных?'))
      this.transportationService.delete(transportation.id)
        .then(() => {
            this.transportations = this.transportations.filter(t => t !== transportation);
          });
  }
}