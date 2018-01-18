import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Type } from '../../_classes/list/type';
import { TypeService } from '../../_services/type.service';
import { SController } from '../../_classes/s.controller';

@Component({
  selector: 'type-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.sass']
})
export class TypesComponent extends SController implements OnInit {
  types: Type[] = [];

  constructor(private typeService: TypeService,
              private router: Router) { super(); }

  ngOnInit() {
    this.typeService.getTypes().then((types: Type[]) => this.types = types);
  }

  onSelect(type: Type) {
    this.router.navigate(['/type', type.id]);
  }

  onDelete(type: Type) {
    if (confirm('Вы действительно хотите удалить текущую запись?')) {
      this.typeService.delete(type.id)
        .then((res: any) => res.rslt ? this.types = this.types.filter(k => k !== type) : null);
    }
  }
}
