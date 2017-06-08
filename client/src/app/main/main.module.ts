import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { ClientsComponent } from './clients/clients.component';
import { TabComponent } from './tab/tab.component';
import { ClientComponent } from './client/client.component';
import { ContactComponent }  from './contact/contact.component';
import { ContactsComponent }  from './contacts/contacts.component';
import { KategoryComponent }  from './kategory/kategory.component';
import { KategoriesComponent }  from './kategories/kategories.component';

import { ClientService } from '../_services/client.service';
import { ContactService } from '../_services/contact.service';
import { KategoryService } from '../_services/kategory.service';
import { MainRoutingModule } from './main.routing.module';

import { MaterialModule, MdNativeDateModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    MdNativeDateModule,
    BrowserAnimationsModule,    
    FormsModule,
    MainRoutingModule
  ],
  declarations: [
    ClientsComponent,
    TabComponent,
    ClientComponent,
    ContactComponent,
    ContactsComponent,
    KategoryComponent,
    KategoriesComponent
  ],
  providers: [ 
    ClientService,
    ContactService,
    KategoryService
  ]
})
export class MainModule {}

