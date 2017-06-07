import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { ClientsComponent } from './clients/clients.component';
import { TabComponent } from './tab/tab.component';
import { TabClientComponent } from './tab-client/tab-client.component';
import { TabContactComponent } from './tab-contact/tab-contact.component';
import { ContactComponent }  from './contact/contact.component';
import { ContactsComponent }  from './contacts/contacts.component';

import { ClientService } from '../_services/client.service';
import { ContactService } from '../_services/contact.service';
import { MainClientRoutingModule } from './main-client.routing.module';
import { TabKategoryComponent } from './tab-kategory/tab-kategory.component';
import { TabTransportationComponent } from './tab-transportation/tab-transportation.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,    
    MainClientRoutingModule
  ],
  declarations: [
    ClientsComponent,
    TabComponent,
    TabClientComponent,
    TabContactComponent,
    ContactComponent,
    ContactsComponent,
    TabKategoryComponent,
    TabTransportationComponent
  ],
  providers: [ 
    ClientService,
    ContactService
  ]
})
export class MainClientModule {}

