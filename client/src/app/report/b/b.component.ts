import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { BReport } from '../../_classes/report/b.report';
import { Firm } from '../../_classes/list/firm';
import { FirmService } from '../../_services/firm.service';
import { Month } from '../../_classes/month';
import { Months } from '../../_mock/months';
import { B } from '../../_classes/list/b';
import { ReportService } from '../../_services/report.service';

@Component({
  selector: 'report-b',
  templateUrl: './b.component.html',
  styleUrls: ['./b.component.sass']
})
export class BComponent implements OnInit {
  report: BReport = new BReport();
  firms: Firm[] = [];
  months: Month[] = Months;
  bs: B[] = [];

  constructor(private reportService: ReportService,
              private firmService: FirmService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.firmService.getFirms().then((firms: Firm[]) => this.firms = firms);

    this.route.params
      .switchMap((params: Params) => this.reportService.getB(this.report.clone(params)))
      .subscribe((bs: B[]) => this.bs = bs);
  }

  onClick() {
    this.router.navigate(this.report.getUrl(['report', 'b']));
  }

  onGetFile() {
    this.reportService.getBFile(this.report);
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
