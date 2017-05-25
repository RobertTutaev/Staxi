import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Doc } from '../../_classes/doc';
import { DocService } from '../../_services/doc.service';

@Component({
  selector: 'doc-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.sass']
})
export class DocsComponent implements OnInit {
  docs: Doc[] = [];
  
  constructor(private docService: DocService,
              private router: Router) { }
  
  ngOnInit() {
    this.docService.getDocs().then((docs: Doc[]) => this.docs = docs);
  }

  onSelect(doc: Doc) {
    this.router.navigate(['/doc', doc.id]);
  }

  onDelete(doc: Doc) {
    if(confirm('Вы действительно хотите удалить текущую запись и все связанные с ней записи из базы данных?'))
      this.docService.delete(doc.id)
        .then(() => {
            this.docs = this.docs.filter(d => d !== doc);
          });
  }
}
