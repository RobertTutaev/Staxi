import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Transportation } from '../../_classes/list/transportation';
import { TransportationService } from '../../_services/transportation.service';
import { SController } from '../../_classes/s.controller';
import { Status } from '../../_classes/status';
import { Statuses } from '../../_mock/statuses';

@Component({
  selector: 'transportations',
  templateUrl: './transportations.component.html',
  styleUrls: ['./transportations.component.sass']
})
export class TransportationsComponent extends SController implements OnInit {
  transportations: Transportation[] = [];
  statuses: Status[] = Statuses;

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
    if(confirm('Вы действительно хотите удалить текущую запись?'))
      this.transportationService.delete(transportation.id)
        .then((res: any) => res.rslt ? this.transportations = this.transportations.filter(k => k !== transportation) : null);
  }

  getStatusName(transportation: Transportation): string {
    return this.statuses[transportation.status].name;
  }
}