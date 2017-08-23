import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SigninPage } from '../signin/signin';
import { TransportationsPage } from '../transportations/transportations';
import { Car } from '../../_classes/list/car';
import { CReport } from '../../_classes/report/c.report';
import { CarProvider } from '../../providers/car/car';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage{
  dt: string = new Date().toISOString();
  cars: Car[] = [];
  report: CReport = new CReport();

  constructor(public navCtrl: NavController,
              public authProvider: AuthProvider,              
              private carProvider: CarProvider) {    
  }

  IonViewDidEnter() {
    console.log('cars');
    if (this.authProvider.isSignedIn)
      this.carProvider.getCarsD().then((cars: Car[]) => {
        this.cars = cars;
  
        if (!this.report.carId && cars && cars.length)
          this.report.carId = cars[0].id;
      });
  }

  get selectedCarId(): number {
    return this.report.carId;
  }

  set selectedCarId(value: number) {
    this.report.carId = value;
  }

  Signin() {
    this.navCtrl.push(SigninPage);
  }

  Transportations() {
    this.report.aDt = Date.parse(this.dt);
    this.navCtrl.push(TransportationsPage, {report: this.report});
  }
}