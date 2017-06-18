import 'rxjs/add/operator/switchMap';
import { Location }               from '@angular/common';

import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Punkt } from '../../_classes/edit/punkt';
import { PunktService } from '../../_services/punkt.service';

@Component({
  selector: 'punkt-punkt',
  templateUrl: './punkt.component.html',
  styleUrls: ['./punkt.component.sass']
})
export class PunktComponent implements OnInit {
  punkt: Punkt = new Punkt(); 
  
  constructor(private punktService: PunktService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) { }
  
  ngOnInit() {
    this.route.params     
      // (+) converts string 'id' to a number
      .switchMap((params: Params) => this.punktService.getPunkt(+params['id']))
      .subscribe((punkt: Punkt) => this.punkt = punkt);
  }

  onSubmit() {
    if (this.punkt.id)
      this.punktService.update(this.punkt)
        .then(() => this.gotoBack());
    else 
      this.punktService.create(this.punkt)
        .then(() => this.gotoBack());
  }  

  gotoBack() {
    this.location.back();
  }
}