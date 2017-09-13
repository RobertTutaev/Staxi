import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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

  ionViewDidEnter() {
    this.authProvider.isSign()
    if (!this.authProvider.isSignedIn)
      this.authProvider.isSign().then(() => this.getCars());
    else 
      this.getCars();
  }

  getCars() {
    // Если водитель прошел аутентификацию, то
    if (this.authProvider.isSignedIn) {
      // Если машин для выбора в списке нет, то пытаемся их получить
      if (this.cars && !this.cars.length)
        this.carProvider.getCarsD().then((cars: Car[]) => {
          this.cars = cars;
          if (!this.report.carId && cars && cars.length)
            this.report.carId = cars[0].id;
        });
    // Если водитель не прошел аутентификацию или вышел, то
    } else {
      this.cars = [];
    }
  }

  get selectedCarId(): number {
    return this.report.carId;
  }

  set selectedCarId(value: number) {
    this.report.carId = value;
  }

  signin() {
    this.navCtrl.parent.select(2);
  }

  transportations() {
    this.report.aDt = Date.parse(this.dt);
    this.navCtrl.push(TransportationsPage, {report: this.report});
  }
}