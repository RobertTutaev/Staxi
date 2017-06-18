import 'rxjs/add/operator/switchMap';
import { Location }               from '@angular/common';

import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Type } from '../../_classes/edit/type';
import { TypeService } from '../../_services/type.service';

@Component({
  selector: 'type-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.sass']
})
export class TypeComponent implements OnInit {
  type: Type = new Type(); 
  
  constructor(private typeService: TypeService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) { }
  
  ngOnInit() {
    this.route.params     
      .switchMap((params: Params) => this.typeService.getType(+params['id']))
      .subscribe((type: Type) => this.type = type);
  }

  onSubmit() {
    if (this.type.id)
      this.typeService.update(this.type)
        .then(() => this.gotoBack());
    else 
      this.typeService.create(this.type)
        .then(() => this.gotoBack());
  }  

  gotoBack() {
    this.location.back();
  }
}