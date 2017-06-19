import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Transportation } from '../../_classes/list/transportation';
import { TransportationService } from '../../_services/transportation.service';
import { SController } from '../../_classes/s.controller';

@Component({
  selector: 'transportations',
  templateUrl: './transportations.component.html',
  styleUrls: ['./transportations.component.sass']
})
export class TransportationsComponent extends SController implements OnInit {
  transportations: Transportation[] = [];

  constructor(private transportationService: TransportationService,
              private route: ActivatedRoute,
              private router: Router) { super(); }
  
  ngOnInit() {
    this.route.parent.parent.params
      .switchMap((params: Params) => this.transportationService.getTransportations(+params['id']))
      .subscribe((transportations: Transportation[]) => this.transportations = transportations);
  }

  onSelect(transportation: Transportation) {
    this.router.navigate(['../', transportation.id], { relativeTo: this.route });
  }

  onDelete(transportation: Transportation) {
    if(confirm('Вы действительно хотите удалить текущую запись и все связанные с ней записи из базы данных?'))
      this.transportationService.delete(transportation.id)
        .then(() => {
            this.transportations = this.transportations.filter(t => t !== transportation);
          });
  }
}