import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Punkt } from '../../_classes/punkt';
import { PunktService } from '../../_services/punkt.service';

@Component({
  selector: 'punkt-punkts',
  templateUrl: './punkts.component.html',
  styleUrls: ['./punkts.component.sass']
})
export class PunktsComponent implements OnInit {
  punkts: Punkt[] = [];
  
  constructor(private punktService: PunktService,
              private router: Router) { }
  
  ngOnInit() {
    this.punktService.getPunkts().then((punkts: Punkt[]) => this.punkts = punkts);
  }

  onSelect(punkt: Punkt) {
    this.router.navigate(['/punkt', punkt.id]);
  }

  onDelete(punkt: Punkt) {
    if(confirm('Вы действительно хотите удалить текущую запись и все связанные с ней записи из базы данных?'))
      this.punktService.delete(punkt.id)
        .then(() => {
            this.punkts = this.punkts.filter(p => p !== punkt);
          });
  }
}
