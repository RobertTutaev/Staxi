import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Stat } from '../../_classes/list/stat';
import { Transportation } from '../../_classes/list/transportation';
import { TransportationService } from '../../_services/transportation.service';
import { SController } from '../../_classes/s.controller';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'transportations',
  templateUrl: './transportations.component.html',
  styleUrls: ['./transportations.component.sass']
})
export class TransportationsComponent extends SController implements OnInit {
  stats: Stat[] = [];
  transportations: Transportation[] = [];

  constructor(private authService: AuthService,
              private transportationService: TransportationService,
              private route: ActivatedRoute,
              private router: Router) { super(); }
  
  ngOnInit() {
    this.route.parent.parent.params
      .switchMap((params: Params) => this.transportationService.getStat(+params['id']))
      .subscribe((stats: Stat[]) => this.stats = stats);

    this.route.parent.parent.params
      .switchMap((params: Params) => this.transportationService.getTransportations(+params['id']))
      .subscribe((transportations: Transportation[]) => this.transportations = transportations);
  }

  onGetFile() {
    this.route.parent.parent.params
      .switchMap((params: Params) => this.transportationService.getTFile(+params['id'], this.column, this.direction))
      .subscribe();
  }

  onSelect(transportation: Transportation) {
    this.router.navigate(['../', transportation.id], { relativeTo: this.route });
  }

  onCopy(transportation: Transportation) {
    this.router.navigate(['../', transportation.id, 1], { relativeTo: this.route });
  }

  onDelete(transportation: Transportation) {
    if(confirm('Вы действительно хотите удалить текущую запись?'))
      this.transportationService.delete(transportation.id)
        .then((res: any) => res.rslt ? this.transportations = this.transportations.filter(k => k !== transportation) : null);
  } 
}