import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { StreetsComponent }    from './streets/streets.component';
import { StreetComponent }  from './street/street.component';

import { StreetService } from '../_services/street.service';

import { ServeStreetRoutingModule } from './serve-street.routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ServeStreetRoutingModule
  ],
  declarations: [
    StreetsComponent,
    StreetComponent
  ],
  providers: [ StreetService ]
})
export class ServeStreetModule {}