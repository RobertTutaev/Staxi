import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { ClientsComponent } from './clients/clients.component';
import { TabComponent } from './tab/tab.component';
import { ClientComponent } from './client/client.component';
import { ContactComponent }  from './contact/contact.component';
import { ContactsComponent }  from './contacts/contacts.component';

import { ClientService } from '../_services/client.service';
import { ContactService } from '../_services/contact.service';
import { MainClientRoutingModule } from './main-client.routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,    
    MainClientRoutingModule
  ],
  declarations: [
    ClientsComponent,
    TabComponent,
    ClientComponent,
    ContactComponent,
    ContactsComponent
  ],
  providers: [ 
    ClientService,
    ContactService
  ]
})
export class MainClientModule {}

