import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { TypesComponent }    from './types/types.component';
import { TypeComponent }  from './type/type.component';

import { TypeService } from '../_services/type.service';

import { ServeTypeRoutingModule } from './serve-type.routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ServeTypeRoutingModule
  ],
  declarations: [
    TypesComponent,
    TypeComponent
  ],
  providers: [ TypeService ]
})
export class ServeTypeModule {}

