import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClientsComponent } from './clients/clients.component';
import { TabComponent } from './tab/tab.component';
import { ClientComponent } from './client/client.component';
import { ContactComponent } from './contact/contact.component';
import { ContactsComponent } from './contacts/contacts.component';
import { CategoryComponent } from './category/category.component';
import { CategoriesComponent } from './categories/categories.component';
import { TransportationComponent } from './transportation/transportation.component';
import { TransportationsComponent } from './transportations/transportations.component';

import { ClientService } from '../_services/client.service';
import { ContactService } from '../_services/contact.service';
import { CategoryService } from '../_services/category.service';
import { TransportationService } from '../_services/transportation.service';
import { ReasonService } from '../_services/reason.service';
import { StatusService } from '../_services/status.service';
import { MainRoutingModule } from './main.routing.module';
import { ToolsModule } from '../tools/tools.module';

@NgModule({
  imports: [
    ToolsModule,
    CommonModule,
    FormsModule,
    MainRoutingModule
  ],
  declarations: [
    ClientsComponent,
    TabComponent,
    ClientComponent,
    ContactComponent,
    ContactsComponent,
    CategoryComponent,
    CategoriesComponent,
    TransportationComponent,
    TransportationsComponent
  ],
  providers: [
    ReasonService,
    StatusService,
    ClientService,
    ContactService,
    CategoryService,
    TransportationService
  ]
})
export class MainModule {}
