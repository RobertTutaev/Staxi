import 'rxjs/add/operator/switchMap';
import { Location }               from '@angular/common';

import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Car } from '../../_classes/list/car';
import { CarService } from '../../_services/car.service';
import { Punkt } from '../../_classes/list/punkt';
import { PunktService } from '../../_services/punkt.service';
import { Street } from '../../_classes/list/street';
import { StreetService } from '../../_services/street.service';
import { Transportation } from '../../_classes/list/transportation';
import { TransportationService } from '../../_services/transportation.service';

import { MdDatepicker } from '@angular/material';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'transportation',
  templateUrl: './transportation.component.html',
  styleUrls: ['./transportation.component.sass']
})
export class TransportationComponent implements OnInit {
  cars: Car[] = [];
  punkts: Punkt[] = [];
  transportation: Transportation = new Transportation();

  streetDivName: string = 'a_street';
  streets: Observable<Street[]>;
  private searchTerms = new Subject<string>();
  
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
    
    this.streets = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.streetService.search(term)
        // or the observable of empty heroes if there was no search term
        : Observable.of<Street[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Street[]>([]);
      });

    this.route.params
      .switchMap((params: Params) => this.transportationService.getTransportation(+params['idc']))
      .subscribe((transportation: Transportation) => this.transportation = transportation);
  }

  // Push a search term into the observable stream.
  searchStreet(name: string, term: string = ''): void {
    this.streetDivName = name;
    if (term ==='') {
      this.transportation[this.streetDivName] = '';
    }

    this.searchTerms.next(term);
  }

  setStreetId(name: string, street: Street): void {
    this.transportation[name + '_id'] = street.id;
    this.transportation[name] = street.name + ' ' + street.socr;
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

  get selectedCarId(): number {
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

  gotoBack() {
    this.location.back();
  }
}