import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Territory } from '../../_classes/territory';
import { TerritoryService } from '../../_services/territory.service';

@Component({
  selector: 'territory-territories',
  templateUrl: './territories.component.html',
  styleUrls: ['./territories.component.sass']
})
export class TerritoriesComponent implements OnInit {
  territories: Territory[] = [];
  
  constructor(private territoryService: TerritoryService,
              private router: Router) { }
  
  ngOnInit() {
    this.territoryService.getTerritories().then((territories: Territory[]) => this.territories = territories);
  }

  onSelect(territory: Territory) {
    this.router.navigate(['/territory', territory.id]);
  }

  getTerritoryName(territory: Territory): string {
    if(territory.territory_id)
      return this.territories.find(myObj => myObj.id === territory.territory_id).name;
    else
      return '';
  }

  onDelete(territory: Territory) {
    if(confirm('Вы действительно хотите удалить текущую запись и все связанные с ней записи из базы данных?'))
      this.territoryService.delete(territory.id)
        .then(() => {
            this.territories = this.territories.filter(t => t !== territory);
          });
  }
}