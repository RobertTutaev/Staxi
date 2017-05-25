import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { FirmsComponent }    from './firms/firms.component';
import { FirmComponent }  from './firm/firm.component';

import { FirmService } from '../_services/firm.service';

import { ServeFirmRoutingModule } from './serve-firm.routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ServeFirmRoutingModule
  ],
  declarations: [
    FirmsComponent,
    FirmComponent
  ],
  providers: [ FirmService ]
})
export class ServeFirmModule {}

