import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Territory } from '../../_classes/territory';
import { TerritoryService } from '../../_services/territory.service';
import { Firm } from '../../_classes/firm';
import { FirmService } from '../../_services/firm.service';

@Component({
  selector: 'firm-firms',
  templateUrl: './firms.component.html',
  styleUrls: ['./firms.component.sass']
})
export class FirmsComponent implements OnInit {
  firms: Firm[] = [];
  territories: Territory[] = [];
  
  constructor(private territoryService: TerritoryService,
              private firmService: FirmService,
              private router: Router) { }
  
  ngOnInit() {
    this.territoryService.getTerritories().then((territories: Territory[]) => {
      this.territories = territories;
      this.firmService.getFirms().then((firms: Firm[]) => this.firms = firms);
    })
  }

  onSelect(firm: Firm) {
    this.router.navigate(['/firm', firm.id]);
  }

  getTerritoryName(firm: Firm): string {
    return this.territories.find(myObj => myObj.id === firm.territory_id).name;
  }

  onDelete(firm: Firm) {
    if(confirm('Вы действительно хотите удалить текущую запись и все связанные с ней записи из базы данных?'))
      this.firmService.delete(firm.id)
        .then(() => {
            this.firms = this.firms.filter(f => f !== firm);
          });
  }
}
