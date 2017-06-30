import 'rxjs/add/operator/switchMap';
import { Location } from '@angular/common';

import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

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
  dt: string = '01.01.2000';

  selectedKateg: Kateg = new Kateg();
  kategs: Kateg[] = [];
  selectedDoc: Doc = new Doc();
  docs: Doc[] = [];
  isOk: number = 0;
  category: Category = new Category();
  
  constructor(private kategService: KategService,
              private docService: DocService,
              private categoryService: CategoryService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) { }
  
  ngOnInit() {
    this.kategService.getKategs().then((kategs: Kateg[]) => {
        this.kategs = kategs;
        this.isOk++;
        this.init();
    });

    this.docService.getDocs().then((docs: Doc[]) => {
        this.docs = docs;
        this.isOk++;
        this.init();
    });
    this.route.params     
      .switchMap((params: Params) => this.categoryService.getCategory(+params['idc']))
      .subscribe((category: Category) => {        
        this.category = category;        
        this.isOk++;
        this.init();                    
    });
  }

  init() {
    if(this.isOk>2) {
      this.selectedKateg = this.kategs.find(myObj => myObj.id === this.category.kateg_id);
      this.selectedDoc = this.docs.find(myObj => myObj.id === this.category.doc_id);
    }
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
    if(value) {
      this.selectedKateg = this.kategs.find(myObj => myObj.id === value);
      this.category.kateg_id = value;
    }    
  }

  get selectedDocId(): number {
    return this.category.doc_id;
  }

  set selectedDocId(value: number) {
    if(value) {
      this.selectedDoc = this.docs.find(myObj => myObj.id === value);
      this.category.doc_id = value;
    }    
  }

  min: any = new Date(2018, 10, 10);

  gotoBack() {
    this.location.back();
  }
}