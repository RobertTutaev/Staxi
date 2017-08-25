import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Cd } from '../../_classes/list/cd';
import { ReportProvider } from '../../providers/report/report';
import { CReport } from '../../_classes/report/c.report';
import { CallNumber } from '@ionic-native/call-number';
import { AlertController } from 'ionic-angular';
import { MapPage } from '../map/map';

/**
 * Generated class for the TransportationsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transportations',
  templateUrl: 'transportations.html',
})
export class TransportationsPage{
  cds: Cd[] = [];
  report: CReport = new CReport();

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public alertCtrl: AlertController,
      private callNumber: CallNumber,
      private reportProvider: ReportProvider) {}

  ionViewDidLoad() {
    this.reportProvider.getCd(this.report.clone(this.navParams.get('report'))).then((cds: Cd[]) => this.cds = cds);
  }

  // Звонок
  call(cd: Cd) {    
    let cnArray = cd.client_contact.split(/,{1,}/);
    let i = -1;

    let alert = this.alertCtrl.create();
    alert.setTitle('Выберите номер');    
    cnArray.forEach((cn: string) => {
      if (cn.trim() !== '') {
        i++;
        alert.addInput({
          type: 'radio',
          label: cn.trim(),
          value: cn.trim(),
          checked: !i
        });
      }
    });

    alert.addButton('Отмена');
    alert.addButton({
      text: 'Звонок',
      handler: data => {
        this.callNumber.callNumber("7298223", true)
          .then(() => console.log('Звонок инициализирован...'))
          .catch(() => this.showErrorAlert('Внимание! Возникла ошибка инициализации...'));
      }
    });
    alert.present();    
  }

  //Сообщение об ошибке
  showErrorAlert(message: string) {
    let alert = this.alertCtrl.create({
      title: 'Ошибка',
      subTitle: message,
      buttons: ['Ок']
    });
    alert.present();
  }

  map(cd: Cd) {
    this.navCtrl.push(MapPage, {cd: cd});
  }
}