import 'rxjs/add/operator/switchMap';
import { Location }               from '@angular/common';

import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Territory } from '../../_classes/territory';
import { TerritoryService } from '../../_services/territory.service';

@Component({
  selector: 'territory-territory',
  templateUrl: './territory.component.html',
  styleUrls: ['./territory.component.sass']
})
export class TerritoryComponent implements OnInit {

  territories: Territory[] = [];  
  territory: Territory = new Territory();  
  
  constructor(private territoryService: TerritoryService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) { }
  
  ngOnInit() {

    this.territoryService.getTerritories().then((territories: Territory[]) => {
        this.territories = territories;
        this.territories.unshift(new Territory());
        this.route.params     
          .switchMap((params: Params) => this.territoryService.getTerritory(+params['id']))
          .subscribe((territory: Territory) => this.territory = territory);
      });
  }

  onSubmit() {
    if (this.territory.id)
      this.territoryService.update(this.territory)
        .then(() => this.gotoBack());
    else 
      this.territoryService.create(this.territory)
        .then(() => this.gotoBack());
  }

  get selectedTerritoryId(): number {
    return this.territory.territory_id;
  }

  set selectedTerritoryId(value: number) {
    this.territory.territory_id = value;
  } 

  gotoBack() {
    this.location.back();
  }
}