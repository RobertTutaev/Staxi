import { Location } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Kateg } from '../../_classes/list/kateg';
import { KategService } from '../../_services/kateg.service';
import { Doc } from '../../_classes/list/doc';
import { DocService } from '../../_services/doc.service';
import { Category } from '../../_classes/list/category';
import { CategoryService } from '../../_services/category.service';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.sass']
})
export class CategoryComponent implements OnInit {
  kategs: Kateg[] = [];
  docs: Doc[] = [];
  category = new Category();

  constructor(private kategService: KategService,
              private docService: DocService,
              private categoryService: CategoryService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) { }

  ngOnInit() {
    Promise.all(
        [
          this.kategService.getKategs(true),
          this.docService.getDocs(true),
          new Promise(
            (resolve) => {
              this.route.params
                .switchMap((params: Params) => this.categoryService.getCategory(+params['idc']))
                .subscribe(
                  (category: Category) => {
                    this.category = category;
                    resolve(category);
                  },
                  (err) => {
                    resolve(err);
                  }
                );
            }
          )
        ])
      .then(
        (values) => {
          console.log(values);
          this.kategs = values[0];
          this.docs = values[1];
          //this.category = values[2];

          // Kateg (add if not exist)
          if (this.category.kateg_id && !this.kategs.filter(k => k.id === this.category.kateg_id).length) {
            const kateg: Kateg = new Kateg();
            kateg.id = this.category.kateg_id;
            kateg.name = this.category.kateg;
            this.kategs.push(kateg);
          }

          // Doc (add if not exist)
          if (this.category.doc_id && !this.docs.filter(k => k.id === this.category.doc_id).length) {
            const doc: Doc = new Doc();
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