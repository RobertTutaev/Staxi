import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Kateg } from '../../_classes/kateg';
import { KategService } from '../../_services/kateg.service';
import { Doc } from '../../_classes/doc';
import { DocService } from '../../_services/doc.service';
import { Kategory } from '../../_classes/kategory';
import { KategoryService } from '../../_services/kategory.service';

@Component({
  selector: 'kategories',
  templateUrl: './kategories.component.html',
  styleUrls: ['./kategories.component.sass']
})
export class KategoriesComponent implements OnInit {
  kategs: Kateg[] = [];
  docs: Doc[] = [];
  kategories: Kategory[] = [];
  
  constructor(private kategService: KategService,
              private docService: DocService,  
              private kategoryService: KategoryService,
              private route: ActivatedRoute,
              private router: Router) { }
  
  ngOnInit() {
    this.kategService.getKategs().then((kategs: Kateg[]) => this.kategs = kategs);

    this.docService.getDocs().then((docs: Doc[]) => this.docs = docs);    

    this.route.parent.parent.params
      .switchMap((params: Params) => this.kategoryService.getKategories(+params['id']))
      .subscribe((kategories: Kategory[]) => this.kategories = kategories);
  }

  onSelect(kategory: Kategory) {
    this.router.navigate(['../', kategory.id], { relativeTo: this.route });
  }

  getKategName(kategory: Kategory): string {
    return this.kategs.find(myObj => myObj.id === kategory.kateg_id).name;
  }
  
  getDocName(kategory: Kategory): string {
    return this.docs.find(myObj => myObj.id === kategory.doc_id).name;
  }

  onDelete(kategory: Kategory) {
    if(confirm('Вы действительно хотите удалить текущую запись и все связанные с ней записи из базы данных?'))
      this.kategoryService.delete(kategory.id)
        .then(() => {
            this.kategories = this.kategories.filter(k => k !== kategory);
          });
  }
}