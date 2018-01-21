import 'rxjs/add/operator/switchMap';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Firm } from '../../_classes/list/firm';
import { FirmService } from '../../_services/firm.service';
import { User } from '../../_classes/list/user';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'user-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {

  user: User = new User();
  firms: Firm[] = [];

  constructor(private firmService: FirmService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) { }

  ngOnInit() {
    this.firmService.getFirms().then((firms: Firm[]) => {
        this.firms = firms;
        this.route.params
          .switchMap((params: Params) => this.userService.getUser(+params['id']))
          .subscribe((user: User) => {
              this.user = user;
            });
        });
  }

  onSubmit() {
    if (this.user.id) {
      this.userService.update(this.user)
        .then(() => this.location.back());
    } else {
      this.userService.create(this.user)
        .then(() => this.location.back());
    }
  }

  get selectedFirmId(): number {
    return this.user.firm_id;
  }

  set selectedFirmId(value: number) {
    this.user.firm_id = value;
  }

  gotoBack() {
    this.location.back();
  }
}
