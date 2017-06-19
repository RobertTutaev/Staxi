import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { PunktsComponent }    from './punkts/punkts.component';
import { PunktComponent }  from './punkt/punkt.component';
import { PunktService } from '../_services/punkt.service';
import { ServePunktRoutingModule } from './serve-punkt.routing.module';
import { ToolsModule } from '../tools/tools.module';

@NgModule({
  imports: [
    ToolsModule,
    CommonModule,
    FormsModule,
    ServePunktRoutingModule
  ],
  declarations: [
    PunktsComponent,
    PunktComponent
  ],
  providers: [ PunktService ]
})
export class ServePunktModule {}