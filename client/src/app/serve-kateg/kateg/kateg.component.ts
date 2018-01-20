import 'rxjs/add/operator/switchMap';
import { Location } from '@angular/common';

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Kateg } from '../../_classes/list/kateg';
import { KategService } from '../../_services/kateg.service';

@Component({
  selector: 'kateg-kateg',
  templateUrl: './kateg.component.html',
  styleUrls: ['./kateg.component.sass']
})
export class KategComponent implements OnInit {
  kateg: Kateg = new Kateg();

  constructor(private kategService: KategService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) { }

  ngOnInit() {
    this.route.params
      // (+) converts string 'id' to a number
      .switchMap((params: Params) => this.kategService.getKateg(+params['id']))
      .subscribe((kateg: Kateg) => this.kateg = kateg);
  }

  onSubmit() {
    if (this.kateg.id) {
      this.kategService.update(this.kateg)
        .then(() => this.gotoBack());
    } else {
      this.kategService.create(this.kateg)
        .then(() => this.gotoBack());
    }
  }

  gotoBack() {
    this.location.back();
  }
}
