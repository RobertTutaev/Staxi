import { Location } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { TController } from '../../_classes/t.controller';
import { AReport } from '../../_classes/report/a.report';
import { BReport } from '../../_classes/report/b.report';

@Component({
  selector: 'tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.sass']
})
export class TabComponent extends TController{
  aReport: AReport = new AReport();
  bReport: BReport = new BReport();
  
  constructor(route: ActivatedRoute,
              location: Location) { super(route, location); }
}