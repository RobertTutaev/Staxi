import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AReport } from '../../_classes/report/a.report';
import { Firm } from '../../_classes/list/firm';
import { FirmService } from '../../_services/firm.service';
import { Status } from '../../_classes/list/status';
import { StatusService } from '../../_services/status.service';
import { Transportation } from '../../_classes/list/transportation';
import { ReportService } from '../../_services/report.service';

@Component({
  selector: 'report-a',
  templateUrl: './a.component.html',
  styleUrls: ['./a.component.sass']
})
export class AComponent implements OnInit {
  report: AReport = new AReport();
  firms: Firm[] = [];
  statuses: Status[] = [];
  transportations: Transportation[] = [];
  
  constructor(private reportService: ReportService,
              private firmService: FirmService,
              private statusService: StatusService,
              private route: ActivatedRoute,
              private router: Router) { }
  
  ngOnInit() {
    this.firmService.getFirms().then((firms: Firm[]) => this.firms = firms);

    this.statusService.getStatuses().then((statuses: Status[]) => this.statuses = statuses);
    
    this.route.params
      .switchMap((params: Params) => this.reportService.getA(this.report.clone(params)))
      .subscribe((transportations: Transportation[]) => this.transportations = transportations);
  }

  onSelect(transportation: Transportation) {
    this.router.navigate(['/client', transportation.client_id, 'transportation', transportation.id]);
  }

  onClick() {    
    this.router.navigate(this.report.getUrl(['report', 'a']));
  }

  get selectedStatusId(): number {
    return this.report.statusId;
  }

  set selectedStatusId(value: number) {
    this.report.statusId = value;
  }

  get selectedFirmId(): number {
    return this.report.firmId;
  }

  set selectedFirmId(value: number) {
    this.report.firmId = value;
  }
}