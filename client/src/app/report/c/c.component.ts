import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { CReport } from '../../_classes/report/c.report';
import { C } from '../../_classes/list/c';
import { Car } from '../../_classes/list/car';
import { CarService } from '../../_services/car.service';
import { ReportService } from '../../_services/report.service';

@Component({
  selector: 'report-c',
  templateUrl: './c.component.html',
  styleUrls: ['./c.component.sass']
})
export class CComponent implements OnInit {
  report: CReport = new CReport();
  cs: C[] = [];
  cars: Car[] = [];

  constructor(private reportService: ReportService,
              private carService: CarService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.carService.getCars().then((cars: Car[]) => this.cars = cars);

    this.route.params
      .switchMap((params: Params) => this.reportService.getC(this.report.clone(params)))
      .subscribe((cs: C[]) => this.cs = cs);
  }

  onSelect(c: C) {
    this.router.navigate(['/client', c.client_id, 'transportation', c.id]);
  }

  onClick() {
    this.router.navigate(this.report.getUrl(['report', 'c']));
  }

  onGetFile() {
    this.reportService.getCFile(this.report);
  }

  get selectedCarId(): number {
    return this.report.carId;
  }

  set selectedCarId(value: number) {
    this.report.carId = value;
  }
}
