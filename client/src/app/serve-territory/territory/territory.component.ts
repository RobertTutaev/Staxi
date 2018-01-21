import 'rxjs/add/operator/switchMap';
import { Location }from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Territory } from '../../_classes/list/territory';
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
          .subscribe((territory: Territory) => {
            this.territory = territory;
            this.territories = this.territories.filter(k => k.id !== this.territory.id);
          });
      });
  }

  onSubmit() {
    if (this.territory.id) {
      this.territoryService.update(this.territory)
        .then(() => this.location.back());
    } else {
      this.territoryService.create(this.territory)
        .then(() => this.location.back());
    }
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
