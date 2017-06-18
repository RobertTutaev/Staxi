import 'rxjs/add/operator/switchMap';
import { Location } from '@angular/common';

import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Kateg } from '../../_classes/list/kateg';
import { KategService } from '../../_services/kateg.service';
import { Doc } from '../../_classes/list/doc';
import { DocService } from '../../_services/doc.service';
import { Kategory } from '../../_classes/list/kategory';
import { KategoryService } from '../../_services/kategory.service';

import { MdDatepicker } from '@angular/material';

@Component({
  selector: 'kategory',
  templateUrl: './kategory.component.html',
  styleUrls: ['./kategory.component.sass']
})
export class KategoryComponent implements OnInit {
  dt: string = '01.01.2000';

  selectedKateg: Kateg = new Kateg();
  kategs: Kateg[] = [];
  selectedDoc: Doc = new Doc();
  docs: Doc[] = [];
  isOk: number = 0;
  kategory: Kategory = new Kategory();
  
  constructor(private kategService: KategService,
              private docService: DocService,
              private kategoryService: KategoryService,
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
      .switchMap((params: Params) => this.kategoryService.getKategory(+params['idc']))
      .subscribe((kategory: Kategory) => {
        this.kategory = kategory;
        this.isOk++;
        this.init();                    
    });
  }

  init() {
    if(this.isOk>2) {
      this.selectedKateg = this.kategs.find(myObj => myObj.id === this.kategory.kateg_id);
      this.selectedDoc = this.docs.find(myObj => myObj.id === this.kategory.doc_id);
    }
  }

  onSubmit() {
    this.route.parent.parent.params
      .subscribe((params: Params) => {
        const client_id = +params['id'];

        if (this.kategory.id) {
          if (this.kategory.client_id === client_id)
            this.kategoryService.update(this.kategory)
              .then(() => this.gotoBack())
          else
            this.gotoBack();
        }
        else {
          this.kategory.client_id = client_id;
          this.kategoryService.create(this.kategory)
            .then(() => this.gotoBack());
        }
      });
  }

  get selectedKategId(): number {
    return this.kategory.kateg_id;
  }

  set selectedKategId(value: number) {
    if(value) {
      this.selectedKateg = this.kategs.find(myObj => myObj.id === value);
      this.kategory.kateg_id = value;
    }    
  }

  get selectedDocId(): number {
    return this.kategory.doc_id;
  }

  set selectedDocId(value: number) {
    if(value) {
      this.selectedDoc = this.docs.find(myObj => myObj.id === value);
      this.kategory.doc_id = value;
    }    
  }

  gotoBack() {
    this.location.back();
  }
}