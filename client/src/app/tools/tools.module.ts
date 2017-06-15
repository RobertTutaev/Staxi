import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterPipe } from './pipes/filter.pipe';
import { OrderByPipe } from './pipes/orderby.pipe';
import { EqualValidatorDirective } from './directives/equal-validator.directive';

@NgModule({
  imports: [    
    CommonModule
  ],
  declarations: [
    FilterPipe,
    OrderByPipe,
    EqualValidatorDirective
  ],
  exports: [
    FilterPipe,
    OrderByPipe
  ]
})
export class ToolsModule { } 