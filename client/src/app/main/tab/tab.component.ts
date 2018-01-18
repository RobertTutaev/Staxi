import { Location } from '@angular/common';
import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TController } from '../../_classes/t.controller';

@Component({
  selector: 'tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.sass']
})
export class TabComponent extends TController{

  constructor(route: ActivatedRoute,
              location: Location) { super(route, location); }
}
