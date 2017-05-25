import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Territory } from '../../_classes/territory';
import { TerritoryService } from '../../_services/territory.service';
import { Street } from '../../_classes/street';
import { StreetService } from '../../_services/street.service';

@Component({
  selector: 'street-streets',
  templateUrl: './streets.component.html',
  styleUrls: ['./streets.component.sass']
})
export class StreetsComponent implements OnInit {
  streets: Street[] = [];
  territories: Territory[] = [];
  
  constructor(private territoryService: TerritoryService,
              private streetService: StreetService,
              private router: Router) { }
  
  ngOnInit() {
    this.territoryService.getTerritories().then((territories: Territory[]) => {
      this.territories = territories;
      this.streetService.getStreets().then((streets: Street[]) => this.streets = streets);
    })
  }

  onSelect(street: Street) {
    this.router.navigate(['/street', street.id]);
  }

  getTerritoryName(street: Street): string {
    return this.territories.find(myObj => myObj.id === street.territory_id).name;
  }

  onDelete(street: Street) {
    if(confirm('Вы действительно хотите удалить текущую запись и все связанные с ней записи из базы данных?'))
      this.streetService.delete(street.id)
        .then(() => {
            this.streets = this.streets.filter(s => s !== street);
          });
  }
}