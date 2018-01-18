import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Doc } from '../../_classes/list/doc';
import { DocService } from '../../_services/doc.service';
import { SController } from '../../_classes/s.controller';

@Component({
  selector: 'doc-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.sass']
})
export class DocsComponent extends SController implements OnInit {
  docs: Doc[] = [];

  constructor(private docService: DocService,
              private router: Router) { super(); }

  ngOnInit() {
    this.docService.getDocs().then((docs: Doc[]) => this.docs = docs);
  }

  onSelect(doc: Doc) {
    this.router.navigate(['/doc', doc.id]);
  }

  onDelete(doc: Doc) {
    if (confirm('Вы действительно хотите удалить текущую запись?')) {
      this.docService.delete(doc.id)
        .then((res: any) => res.rslt ? this.docs = this.docs.filter(k => k !== doc) : null);
    }
  }
}
