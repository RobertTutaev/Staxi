import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Kateg } from '../../_classes/kateg';
import { KategService } from '../../_services/kateg.service';

@Component({
  selector: 'kateg-kategs',
  templateUrl: './kategs.component.html',
  styleUrls: ['./kategs.component.sass']
})
export class KategsComponent implements OnInit {
  kategs: Kateg[] = [];
  
  constructor(private kategService: KategService,
              private router: Router) { }
  
  ngOnInit() {
    this.kategService.getKategs().then((kategs: Kateg[]) => this.kategs = kategs);
  }

  onSelect(kateg: Kateg) {
    this.router.navigate(['/kateg', kateg.id]);
  }

  onDelete(kateg: Kateg) {
    if(confirm('Вы действительно хотите удалить текущую запись и все связанные с ней записи из базы данных?'))
      this.kategService.delete(kateg.id)
        .then(() => {
            this.kategs = this.kategs.filter(k => k !== kateg);
          });
  }
}
