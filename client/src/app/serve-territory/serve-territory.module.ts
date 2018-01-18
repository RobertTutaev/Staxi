import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TerritoriesComponent } from './territories/territories.component';
import { TerritoryComponent } from './territory/territory.component';
import { TerritoryService } from '../_services/territory.service';
import { ServeTerritoryRoutingModule } from './serve-territory.routing.module';
import { ToolsModule } from '../tools/tools.module';

@NgModule({
  imports: [
    ToolsModule,
    CommonModule,
    FormsModule,
    ServeTerritoryRoutingModule
  ],
  declarations: [
    TerritoriesComponent,
    TerritoryComponent
  ],
  providers: [ TerritoryService ]
})
export class ServeTerritoryModule {}
