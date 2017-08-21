import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SigninPage } from '../signin/signin';
import { TransportationsPage } from '../transportations/transportations';
import { Car } from '../../_classes/list/car';
import { CReport } from '../../_classes/report/c.report';
import { CarProvider } from '../../providers/car/car';
import { AuthProvider } from '../../providers/auth/auth';
import * as moment from 'moment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  report: CReport = new CReport();
  cars: Car[] = [];

  constructor(public navCtrl: NavController,
              public authProvider: AuthProvider,              
              private carProvider: CarProvider) {
    this.carProvider.getCars().then((cars: Car[]) => this.cars = cars);
  }

  get selectedDt(): string {
    if(this.report.aDt) 
      return moment(this.report.aDt).format('YYYY-MM-DDTHH:mm:ss.sssZ');
    else
      return new Date().toISOString();
  }

  set selectedDt(value: string) {
    if(value)
      this.report.aDt = Date.parse(value);
    else
      this.report.aDt = Date.now();
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
    this.navCtrl.push(TransportationsPage, {report: this.report});
  }
}