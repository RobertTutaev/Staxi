import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Car } from '../../_classes/list/car';
import { CarService } from '../../_services/car.service';
import { Punkt } from '../../_classes/list/punkt';
import { PunktService } from '../../_services/punkt.service';
import { Category } from '../../_classes/list/category';
import { CategoryService } from '../../_services/category.service';
import { Street } from '../../_classes/list/street';
import { StreetService } from '../../_services/street.service';
import { Transportation } from '../../_classes/list/transportation';
import { TransportationService } from '../../_services/transportation.service';
import { Status } from '../../_classes/list/status';
import { StatusService } from '../../_services/status.service';
import { AuthService } from '../../_services/auth.service';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
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
  categories: Category[] = [];
  status: number = 1;
  statuses: Status[] = [];
  transportation: Transportation = new Transportation();

  streetName: {} = {a_street: '', b_street: ''};
  streetDivName: string = 'a_street';
  streets: Observable<Street[]>;
  private searchTerms : Subject<string> = new Subject<string>();
  
  constructor(private authService: AuthService,
              private carService: CarService,
              private punktService: PunktService,
              private categoryService: CategoryService,
              private streetService: StreetService,
              private statusService: StatusService,
              private transportationService: TransportationService,
              private route: ActivatedRoute,
              private location: Location) { }
  
  ngOnInit() {    

    this.punktService.getPunkts().then((punkts: Punkt[]) => this.punkts = punkts);

    this.statusService.getStatuses().then((statuses: Status[]) => this.statuses = statuses);

    this.route.parent.parent.params
      .switchMap((params: Params) => this.categoryService.getCategories(+params['id']))
      .subscribe((categories: Category[]) => this.categories = categories);
    
    this.streets = this.searchTerms
      .debounceTime(400)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.streetService.search(term)
        // or the observable of empty heroes if there was no search term
        : Observable.of<Street[]>([]))
      .catch(error => Observable.of<Street[]>([]));

    this.carService.getCars(true).then((cars: Car[]) => {
      this.cars = cars;
      this.route.params
        .switchMap((params: Params) => this.transportationService.getTransportation(+params['idc']))
        .subscribe((transportation: Transportation) => {          
          this.transportation = transportation;
          this.status = transportation.status_id;
          this.streetName['a_street'] = this.transportation['a_street'];
          this.streetName['b_street'] = this.transportation['b_street'];

          if (transportation.car_id && !this.cars.filter(k => k.id === transportation.car_id).length) {
            let car: Car = new Car();
            car.id = transportation.car_id;
            car.name = transportation.car;
            this.cars.push(car);
          }
        });
      });
  }

  // Push a search term into the observable stream.
  searchStreet(name: string, term: string = ''): void {
    this.streetDivName = name;
    if (term ==='') {
      this.transportation[this.streetDivName] = this.streetName[name];
    }

    this.searchTerms.next(term);
  }

  setStreetId(name: string, street: Street): void {
    this.transportation[name + '_id'] = street.id;
    this.transportation[name] = `${street.territory}, ${street.name} ${street.socr}`;
    this.streetName[name] = this.transportation[name];
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

  get selectedCategoryId(): number {
    return this.transportation.category_id;
  }

  set selectedCategoryId(value: number) {
    this.transportation.category_id = value;
  }

  get selectedStatusId(): number {
    return this.transportation.status_id;
  }

  set selectedStatusId(value: number) {
    this.transportation.status_id = value;
  } 

  get getHH(): any {
    return this.transportation.a_dt;
  }

  gotoBack() {
    this.location.back();
  }
}