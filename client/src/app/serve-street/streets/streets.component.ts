import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Street } from '../../_classes/list/street';
import { StreetService } from '../../_services/street.service';
import { SController } from '../../_classes/s.controller';

@Component({
  selector: 'street-streets',
  templateUrl: './streets.component.html',
  styleUrls: ['./streets.component.sass']
})
export class StreetsComponent extends SController implements OnInit {
  streets: Street[] = [];
  
  constructor(private streetService: StreetService,
              private router: Router) { super(); }
  
  ngOnInit() {
    this.streetService.getStreets().then((streets: Street[]) => this.streets = streets);
  }

  onSelect(street: Street) {
    this.router.navigate(['/street', street.id]);
  }

  onDelete(street: Street) {
    if(confirm('Вы действительно хотите удалить текущую запись?'))
      this.streetService.delete(street.id)
        .then((res: any) => res.rslt ? this.streets = this.streets.filter(k => k !== street) : null);
  }
}