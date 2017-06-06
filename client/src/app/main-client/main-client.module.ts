import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { ClientsComponent }    from './clients/clients.component';
import { ClientComponent }  from './client/client.component';

import { ClientService } from '../_services/client.service';
import { ContactService } from '../_services/contact.service';
import { MainClientRoutingModule } from './main-client.routing.module';
import { TabClientComponent } from './tab-client/tab-client.component';
import { TabContactComponent } from './tab-contact/tab-contact.component';
import { TabContactsComponent } from './tab-contacts/tab-contacts.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,    
    MainClientRoutingModule
  ],
  declarations: [
    ClientsComponent,
    ClientComponent,
    TabClientComponent,
    TabContactComponent,
    TabContactsComponent
  ],
  providers: [ 
    ClientService,
    ContactService
  ]
})
export class MainClientModule {}

