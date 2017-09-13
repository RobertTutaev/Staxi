import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { App } from './app.component';

import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin';
import { TransportationsPage } from '../pages/transportations/transportations';
import { MapPage } from '../pages/map/map';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { ReportProvider } from '../providers/report/report';
import { CarProvider } from '../providers/car/car';
import { CallNumber } from '@ionic-native/call-number';
import { AppVersion } from '@ionic-native/app-version';

@NgModule({
  declarations: [
    App,
    AboutPage,
    HomePage,
    SigninPage,
    TransportationsPage,
    MapPage,
    TabsPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(App)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    App,
    AboutPage,
    HomePage,
    SigninPage,
    TransportationsPage,
    MapPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CallNumber,
    AppVersion,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    ReportProvider,
    CarProvider
  ]
})
export class AppModule {}
