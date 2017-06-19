import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Category } from '../../_classes/list/category';
import { CategoryService } from '../../_services/category.service';
import { SController } from '../../_classes/s.controller';

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.sass']
})
export class CategoriesComponent extends SController implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService,
              private route: ActivatedRoute,
              private router: Router) { super(); }
  
  ngOnInit() {
    this.route.parent.parent.params
      .switchMap((params: Params) => this.categoryService.getCategories(+params['id']))
      .subscribe((categories: Category[]) => this.categories = categories);
  }

  onSelect(category: Category) {
    this.router.navigate(['../', category.id], { relativeTo: this.route });
  }  

  onDelete(category: Category) {
    if(confirm('Вы действительно хотите удалить текущую запись и все связанные с ней записи из базы данных?'))
      this.categoryService.delete(category.id)
        .then(() => {
            this.categories = this.categories.filter(k => k !== category);
          });
  }
}