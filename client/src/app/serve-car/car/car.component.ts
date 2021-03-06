import 'rxjs/add/operator/switchMap';
import { Location } from '@angular/common';

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Firm } from '../../_classes/list/firm';
import { FirmService } from '../../_services/firm.service';
import { User } from '../../_classes/list/user';
import { UserService } from '../../_services/user.service';
import { Car } from '../../_classes/list/car';
import { CarService } from '../../_services/car.service';

@Component({
  selector: 'car-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.sass']
})
export class CarComponent implements OnInit {
  firms: Firm[] = [];
  users: User[] = [];
  car: Car = new Car();

  constructor(private firmService: FirmService,
              private userService: UserService,
              private carService: CarService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) { }

  ngOnInit() {
    this.firmService.getFirms().then((firms: Firm[]) => this.firms = firms);

    this.userService.getUsers().then((users: User[]) => {
      this.users = users.filter(k => k.role1);

      this.route.params
        .switchMap((params: Params) => this.carService.getCar(+params['id']))
        .subscribe((car: Car) => {
          this.car = car;

          if (car.user_id && !this.users.filter(k => k.id === car.user_id).length) {
            const user: User = new User();
            user.id = car.user_id;
            user.first_name = car.user;
            this.users.push(user);
          }
        });
    });
  }

  onSubmit() {
    if (this.car.id) {
      this.carService.update(this.car)
        .then(() => this.location.back());
    } else {
      this.carService.create(this.car)
        .then(() => this.location.back());
    }
  }

  get selectedFirmId(): number {
    return this.car.firm_id;
  }

  set selectedFirmId(value: number) {
    this.car.firm_id = value;
  }

  get selectedUserId(): number {
    return this.car.user_id;
  }

  set selectedUserId(value: number) {
    this.car.user_id = value;
  }

  gotoBack() {
    this.location.back();
  }
}
