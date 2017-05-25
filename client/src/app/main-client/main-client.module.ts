import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { ClientsComponent }    from './clients/clients.component';
import { ClientComponent }  from './client/client.component';

import { ClientService } from '../_services/client.service';

import { MainClientRoutingModule } from './main-client.routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MainClientRoutingModule
  ],
  declarations: [
    ClientsComponent,
    ClientComponent
  ],
  providers: [ ClientService ]
})
export class MainClientModule {}

