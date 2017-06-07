import 'rxjs/add/operator/switchMap';
import { Location }               from '@angular/common';

import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Territory } from '../../_classes/territory';
import { TerritoryService } from '../../_services/territory.service';
import { Firm } from '../../_classes/firm';
import { FirmService } from '../../_services/firm.service';

@Component({
  selector: 'firm-firm',
  templateUrl: './firm.component.html',
  styleUrls: ['./firm.component.sass']
})
export class FirmComponent implements OnInit {
  
  territories: Territory[] = [];  
  firm: Firm = new Firm();

  constructor(private territoryService: TerritoryService,
              private firmService: FirmService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) { }
  
  ngOnInit() {
    this.territoryService.getTerritories().then((territories: Territory[]) => {
        this.territories = territories;
        this.route.params     
          .switchMap((params: Params) => this.firmService.getFirm(+params['id']))
          .subscribe((firm: Firm) => this.firm = firm);
      })
  }

  onSubmit() {
    if (this.firm.id)
      this.firmService.update(this.firm)
        .then(() => this.gotoBack());
    else 
      this.firmService.create(this.firm)
        .then(() => this.gotoBack());
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