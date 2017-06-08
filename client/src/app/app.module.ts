import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './_mock/in-memory-data.service';

import { MainModule } from './main/main.module';

import { ServeTypeModule } from './serve-type/serve-type.module';
import { ServeCarModule } from './serve-car/serve-car.module';
import { ServeDocModule } from './serve-doc/serve-doc.module';
import { ServeFirmModule } from './serve-firm/serve-firm.module';
import { ServePunktModule } from './serve-punkt/serve-punkt.module';
import { ServeKategModule } from './serve-kateg/serve-kateg.module';
import { ServeStreetModule } from './serve-street/serve-street.module';
import { ServeTerritoryModule } from './serve-territory/serve-territory.module';
import { ServeUserModule } from './serve-user/serve-user.module';

@NgModule({ 
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ServeTerritoryModule,
    ServeStreetModule,
    ServeKategModule,
    ServePunktModule,
    ServeFirmModule,
    ServeDocModule,
    ServeCarModule,
    ServeTypeModule,
    ServeUserModule,
    MainModule,    
    AppRoutingModule,    
    InMemoryWebApiModule.forRoot(InMemoryDataService, {'delay': 100})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }