import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Kateg } from '../../_classes/list/kateg';
import { KategService } from '../../_services/kateg.service';
import { SController } from '../../_classes/s.controller';

@Component({
  selector: 'kateg-kategs',
  templateUrl: './kategs.component.html',
  styleUrls: ['./kategs.component.sass']
})
export class KategsComponent extends SController implements OnInit {
  kategs: Kateg[] = [];

  constructor(private kategService: KategService,
              private router: Router) { super(); }

  ngOnInit() {
    this.kategService.getKategs().then((kategs: Kateg[]) => this.kategs = kategs);
  }

  onSelect(kateg: Kateg) {
    this.router.navigate(['/kateg', kateg.id]);
  }

  onDelete(kateg: Kateg) {
    if (confirm('Вы действительно хотите удалить текущую запись?')) {
      this.kategService.delete(kateg.id)
        .then((res: any) => res.rslt ? this.kategs = this.kategs.filter(k => k !== kateg) : null);
    }
  }
}
