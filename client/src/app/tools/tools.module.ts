import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterPipe } from '../_pipes/filter.pipe';
import { OrderByPipe } from '../_pipes/orderby.pipe';

@NgModule({
  imports: [
    CommonModule,
    FilterPipe,
    OrderByPipe
  ],
  declarations: [
    FilterPipe,
    OrderByPipe
  ],
  exports: [
    FilterPipe,
    OrderByPipe
  ]
})
export class ToolsModule { }