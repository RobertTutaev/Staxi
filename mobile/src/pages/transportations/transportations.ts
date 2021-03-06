import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { C } from '../../_classes/list/c';
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

@Component({
  selector: 'page-transportations',
  templateUrl: 'transportations.html',
})
export class TransportationsPage{
  cs: C[] = [];
  report: CReport = new CReport();

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public alertCtrl: AlertController,
      private callNumber: CallNumber,
      private reportProvider: ReportProvider) {}

  ionViewDidLoad() {
    this.reportProvider.getC(this.report.clone(this.navParams.get('report'))).then((cs: C[]) => this.cs = cs);
  }

  // Звонок
  call(c: C) {    
    let cnArray = c.client_contact.split(/,{1,}/);
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
        console.log(data);
        this.callNumber.callNumber(data, true)
          .then(() => console.log('Звонок инициализирован...'))
          .catch(() => this.showErrorAlert('Внимание! Возникла ошибка инициализации...'));
      }
    });
    alert.present();    
  }

  //Заметки оператора
  comment(c: C) {  
    let alert = this.alertCtrl.create({
      title: 'Комментарий',
      subTitle: c.comment,
      buttons: ['Ок']
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

  map(c: C) {
    this.navCtrl.push(MapPage, {c: c});
  }
}