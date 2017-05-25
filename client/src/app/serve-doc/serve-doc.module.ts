import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { DocsComponent }    from './docs/docs.component';
import { DocComponent }  from './doc/doc.component';

import { DocService } from '../_services/doc.service';

import { ServeDocRoutingModule } from './serve-doc.routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ServeDocRoutingModule
  ],
  declarations: [
    DocsComponent,
    DocComponent
  ],
  providers: [ DocService ]
})
export class ServeDocModule {}

