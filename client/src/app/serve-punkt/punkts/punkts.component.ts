import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Punkt } from '../../_classes/list/punkt';
import { PunktService } from '../../_services/punkt.service';
import { SController } from '../../_classes/s.controller';

@Component({
  selector: 'punkt-punkts',
  templateUrl: './punkts.component.html',
  styleUrls: ['./punkts.component.sass']
})
export class PunktsComponent extends SController implements OnInit {
  punkts: Punkt[] = [];
  
  constructor(private punktService: PunktService,
              private router: Router) { super(); }
  
  ngOnInit() {
    this.punktService.getPunkts().then((punkts: Punkt[]) => this.punkts = punkts);
  }

  onSelect(punkt: Punkt) {
    this.router.navigate(['/punkt', punkt.id]);
  }

  onDelete(punkt: Punkt) {
    if(confirm('Вы действительно хотите удалить текущую запись?'))
      this.punktService.delete(punkt.id)
        .then((res: any) => res.rslt ? this.punkts = this.punkts.filter(k => k !== punkt) : null);
  }
}
