import 'rxjs/add/operator/switchMap';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Firm } from '../../_classes/list/firm';
import { FirmService } from '../../_services/firm.service';
import { Territory } from '../../_classes/list/territory';
import { TerritoryService } from '../../_services/territory.service';

@Component({
  selector: 'firm-firm',
  templateUrl: './firm.component.html',
  styleUrls: ['./firm.component.sass']
})
export class FirmComponent implements OnInit {

  firm: Firm = new Firm();
  firms: Firm[] = [];
  territories: Territory[] = [];

  constructor(private territoryService: TerritoryService,
              private firmService: FirmService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) { }

  ngOnInit() {
    this.firmService.getFirms().then((firms: Firm[]) => {
      this.firms = firms;
      this.firms.unshift(new Firm());
    });

    this.territoryService.getTerritories().then((territories: Territory[]) => this.territories = territories);

    this.route.params
      .switchMap((params: Params) => this.firmService.getFirm(+params['id']))
      .subscribe((firm: Firm) => this.firm = firm);
  }

  onSubmit() {
    if (this.firm.id) {
      this.firmService.update(this.firm)
        .then(() => this.gotoBack());
    } else {
      this.firmService.create(this.firm)
        .then(() => this.gotoBack());
    }
  }

  get selectedFirmId(): number {
    return this.firm.firm_id;
  }

  set selectedFirmId(value: number) {
    this.firm.firm_id = value;
  }

  get selectedTerritoryId(): number {
    return this.firm.territory_id;
  }

  set selectedTerritoryId(value: number) {
    this.firm.territory_id = value;
  }

  gotoBack() {
    this.location.back();
  }
}
