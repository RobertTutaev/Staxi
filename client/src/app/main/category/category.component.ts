import 'rxjs/add/operator/switchMap';
import { Location } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as async from 'async';

import { Kateg } from '../../_classes/list/kateg';
import { KategService } from '../../_services/kateg.service';
import { Doc } from '../../_classes/list/doc';
import { DocService } from '../../_services/doc.service';
import { Category } from '../../_classes/list/category';
import { CategoryService } from '../../_services/category.service';

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.sass']
})
export class CategoryComponent implements OnInit {
  kategs: Kateg[] = [];
  docs: Doc[] = [];  
  category: Category = new Category();
  
  constructor(private kategService: KategService,
              private docService: DocService,
              private categoryService: CategoryService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) { }  
  
  ngOnInit() {
    async.parallel(
      [
        // Kategs
        callback => {
          this.kategService.getKategs(true).then((kategs: Kateg[]) => {
              this.kategs = kategs;
              callback(null, true);
            });          
        },
        // Docs
        callback => {
          this.docService.getDocs(true).then((docs: Doc[]) => {
              this.docs = docs;
              callback(null, true);
            });          
        },
        // Category
        callback => {
          this.route.params     
            .switchMap((params: Params) => this.categoryService.getCategory(+params['idc']))
            .subscribe((category: Category) => {
              this.category = category;
              callback(null, true);
            });
        }
      ],
      // Results
      (err, values) => {
          // Kateg (add if not exist)
          if (this.category.kateg_id && !this.kategs.filter(k => k.id === this.category.kateg_id).length) {
            let kateg: Kateg = new Kateg();
            kateg.id = this.category.kateg_id;
            kateg.name = this.category.kateg;
            this.kategs.push(kateg);
          }
          
          // Doc (add if not exist)
          if (this.category.doc_id && !this.docs.filter(k => k.id === this.category.doc_id).length) {
            let doc: Doc = new Doc();
            doc.id = this.category.doc_id;
            doc.name = this.category.doc;
            this.docs.push(doc);
          }
      }
    );
  }

  onSubmit() {
    this.route.parent.parent.params
      .subscribe((params: Params) => {
        const client_id = +params['id'];
        
        if (this.category.id) {
          if (this.category.client_id === client_id)
            this.categoryService.update(this.category)
              .then(() => this.gotoBack())
          else
            this.gotoBack();
        }
        else {
          this.category.client_id = client_id;
          this.categoryService.create(this.category)
            .then(() => this.gotoBack());
        }
      });
  }

  get selectedKategId(): number {
    return this.category.kateg_id;
  }

  set selectedKategId(value: number) {
    this.category.kateg_id = value;
  }

  get selectedDocId(): number {
    return this.category.doc_id;
  }

  set selectedDocId(value: number) {
    this.category.doc_id = value;
  }

  gotoBack() {
    this.location.back();
  }
}