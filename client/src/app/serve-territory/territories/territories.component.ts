import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Territory } from '../../_classes/list/territory';
import { TerritoryService } from '../../_services/territory.service';
import { SController } from '../../_classes/s.controller';

@Component({
  selector: 'territory-territories',
  templateUrl: './territories.component.html',
  styleUrls: ['./territories.component.sass']
})
export class TerritoriesComponent extends SController implements OnInit {
  territories: Territory[] = [];
  
  constructor(private territoryService: TerritoryService,
              private router: Router) { super(); }
  
  ngOnInit() {
    this.territoryService.getTerritories().then((territories: Territory[]) => this.territories = territories);
  }

  onSelect(territory: Territory) {
    this.router.navigate(['/territory', territory.id]);
  }

  onDelete(territory: Territory) {
    if(confirm('Вы действительно хотите удалить текущую запись?'))
      this.territoryService.delete(territory.id)
        .then((res: any) => res.rslt ? this.territories = this.territories.filter(k => k !== territory) : null);
  }
}