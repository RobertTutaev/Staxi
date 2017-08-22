import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { C } from '../../_classes/list/c';
import { ReportProvider } from '../../providers/report/report';
import { CReport } from '../../_classes/report/c.report';

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
      private reportProvider: ReportProvider) {}

  ngOnInit() {    
    this.reportProvider.getC(this.report.clone(this.navParams.get('report'))).then((cs: C[]) => this.cs = cs);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransportationsPage');
  }

}