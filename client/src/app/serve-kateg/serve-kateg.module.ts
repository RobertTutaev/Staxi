import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { KategsComponent }    from './kategs/kategs.component';
import { KategComponent }  from './kateg/kateg.component';

import { KategService } from '../_services/kateg.service';

import { ServeKategRoutingModule } from './serve-kateg.routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ServeKategRoutingModule
  ],
  declarations: [
    KategsComponent,
    KategComponent
  ],
  providers: [ KategService ]
})
export class ServeKategModule {}

