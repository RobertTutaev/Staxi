import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Firm } from '../../_classes/list/firm';
import { FirmService } from '../../_services/firm.service';
import { SController } from '../../_classes/s.controller';

@Component({
  selector: 'firm-firms',
  templateUrl: './firms.component.html',
  styleUrls: ['./firms.component.sass']
})
export class FirmsComponent extends SController implements OnInit {
  firms: Firm[] = [];

  constructor(private firmService: FirmService,
              private router: Router) { super(); }

  ngOnInit() {
    this.firmService.getFirms().then((firms: Firm[]) => this.firms = firms);
  }

  onSelect(firm: Firm) {
    this.router.navigate(['/firm', firm.id]);
  }

  onDelete(firm: Firm) {
    if (confirm('Вы действительно хотите удалить текущую запись?')) {
      this.firmService.delete(firm.id)
        .then((res: any) => res.rslt ? this.firms = this.firms.filter(k => k !== firm) : null);
    }
  }
}
