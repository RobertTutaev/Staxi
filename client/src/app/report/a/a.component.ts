import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Report } from '../../_classes/report';
import { Firm } from '../../_classes/list/firm';
import { FirmService } from '../../_services/firm.service';
import { Status } from '../../_classes/status';
import { Statuses } from '../../_mock/statuses';
import { Transportation } from '../../_classes/list/transportation';
import { TransportationService } from '../../_services/transportation.service';

@Component({
  selector: 'report-a',
  templateUrl: './a.component.html',
  styleUrls: ['./a.component.sass']
})
export class AComponent implements OnInit {
  report: Report = new Report();
  firms: Firm[] = [];
  statuses: Status[] = Statuses;
  transportations: Transportation[] = [];
  
  constructor(private firmService: FirmService,
              private transportationService: TransportationService,
              private router: Router) { }
  
  ngOnInit() {
    this.firmService.getFirms().then((firms: Firm[]) => {
        this.firms = firms;
    });    
  }

  onSelect(transportation: Transportation) {
    this.router.navigate(['/client', transportation.client_id, 'transportation', transportation.id]);
  }

  onClick() {
    this.transportationService
      .getReportA(this.report)
      .then((transportations: Transportation[]) => this.transportations = transportations);
  }

  get selectedStatus(): number {
    return this.report.status;
  }

  set selectedStatus(value: number) {
    this.report.status = value;
  }

  get selectedFirmId(): number {
    return this.report.firmId;
  }

  set selectedFirmId(value: number) {
    this.report.firmId = value;
  } 

  onDelete(transportation: Transportation) {
    if(confirm('Вы действительно хотите удалить текущую запись?'))
      this.transportationService.delete(transportation.id)
        .then((res: any) => res.rslt ? this.transportations = this.transportations.filter(k => k !== transportation) : null);
  }
}