import 'rxjs/add/operator/switchMap';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Territory } from '../../_classes/list/territory';
import { TerritoryService } from '../../_services/territory.service';
import { Street } from '../../_classes/list/street';
import { StreetService } from '../../_services/street.service';

@Component({
  selector: 'street-street',
  templateUrl: './street.component.html',
  styleUrls: ['./street.component.sass']
})
export class StreetComponent implements OnInit {
  territories: Territory[] = [];

  street: Street = new Street();

  constructor(private territoryService: TerritoryService,
              private streetService: StreetService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) { }

  ngOnInit() {
    this.territoryService.getTerritories().then((territories: Territory[]) => {
        this.territories = territories;
        this.route.params
          .switchMap((params: Params) => this.streetService.getStreet(+params['id']))
          .subscribe((street: Street) => this.street = street);
      });
  }

  onSubmit() {
    if (this.street.id) {
      this.streetService.update(this.street)
        .then(() => this.location.back());
    } else {
      this.streetService.create(this.street)
        .then(() => this.location.back());
    }
  }

  get selectedTerritoryId(): number {
    return this.street.territory_id;
  }

  set selectedTerritoryId(value: number) {
    this.street.territory_id = value;
  }

  gotoBack() {
    this.location.back();
  }
}
