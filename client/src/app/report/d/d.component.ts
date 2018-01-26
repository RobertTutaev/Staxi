import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { DReport } from '../../_classes/report/d.report';
import { Firm } from '../../_classes/list/firm';
import { FirmService } from '../../_services/firm.service';
import { Month } from '../../_classes/month';
import { Months } from '../../_mock/months';
import { D } from '../../_classes/list/d';
import { ReportService } from '../../_services/report.service';

@Component({
  selector: 'report-d',
  templateUrl: './d.component.html',
  styleUrls: ['./d.component.sass']
})
export class DComponent implements OnInit {
  report: DReport = new DReport();
  firms: Firm[] = [];
  months: Month[] = Months;
  ds: D[] = [];

  constructor(private reportService: ReportService,
              private firmService: FirmService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.firmService.getFirms().then((firms: Firm[]) => this.firms = firms);

    this.route.params
      .switchMap((params: Params) => this.reportService.getD(this.report.clone(params)))
      .subscribe((ds: D[]) => this.ds = ds);
  }

  onClick() {
    this.router.navigate(this.report.getUrl(['report', 'd']));
  }

  onGetFile() {
    this.reportService.getDFile(this.report);
  }

  get selectedMonth(): number {
    return this.report.aMonth;
  }

  set selectedMonth(value: number) {
    this.report.aMonth = value;
  }

  get selectedFirmId(): number {
    return this.report.firmId;
  }

  set selectedFirmId(value: number) {
    this.report.firmId = value;
  }
}
