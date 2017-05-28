import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { ContactsComponent }    from './contacts/contacts.component';
import { ContactComponent }  from './contact/contact.component';

import { ContactService } from '../_services/contact.service';

import { MainContactRoutingModule } from './main-contact.routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MainContactRoutingModule
  ],
  declarations: [
    ContactsComponent,
    ContactComponent
  ],
  providers: [ ContactService ]
})
export class MainContactModule {}

