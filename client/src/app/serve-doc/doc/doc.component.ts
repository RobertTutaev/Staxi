import 'rxjs/add/operator/switchMap';
import { Location } from '@angular/common';

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Doc } from '../../_classes/list/doc';
import { DocService } from '../../_services/doc.service';

@Component({
  selector: 'doc-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.sass']
})
export class DocComponent implements OnInit {
  doc: Doc = new Doc();

  constructor(private docService: DocService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) { }

  ngOnInit() {
    this.route.params
      // (+) converts string 'id' to a number
      .switchMap((params: Params) => this.docService.getDoc(+params['id']))
      .subscribe((doc: Doc) => this.doc = doc);
  }

  onSubmit() {
    if (this.doc.id) {
      this.docService.update(this.doc)
        .then(() => this.location.back());
    } else {
      this.docService.create(this.doc)
        .then(() => this.location.back());
    }
  }

  gotoBack() {
    this.location.back();
  }
}
