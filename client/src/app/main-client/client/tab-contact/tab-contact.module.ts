import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { ContactsComponent }    from './contacts/contacts.component';
import { ContactComponent }  from './contact/contact.component';

import { ContactService } from '../../../_services/contact.service';

import { TabContactRoutingModule } from './tab-contact.routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TabContactRoutingModule
  ],
  declarations: [
    ContactsComponent,
    ContactComponent
  ],
  providers: [ ContactService ]
})
export class TabContactModule {}

