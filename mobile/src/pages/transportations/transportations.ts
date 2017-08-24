import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

@IonicPage()
@Component({
  selector: 'page-transportations',
  templateUrl: 'transportations.html',
})
export class TransportationsPage implements OnInit{
  cs: C[] = [];
  report: CReport = new CReport();

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public alertCtrl: AlertController,
      private callNumber: CallNumber,
      private reportProvider: ReportProvider) {}

  ngOnInit() {    
    this.reportProvider.getC(this.report.clone(this.navParams.get('report'))).then((cs: C[]) => this.cs = cs);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransportationsPage');
  }

  // Звонок
  Call(c: C) {    
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
        this.callNumber.callNumber("7298223", true)
          .then(() => console.log('Launched dialer!'))
          .catch(() => console.log('Error launching dialer'));
      }
    });
    alert.present();    
  }

  Map() {
    this.navCtrl.push(MapPage, {});
  }
}