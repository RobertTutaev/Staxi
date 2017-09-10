import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';
import { Info } from '../../_classes/info';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  appInfo: Info = new Info();

  constructor(public navCtrl: NavController,
              private appVersion: AppVersion) { }

  ionViewDidLoad() {
    this.appVersion.getAppName().then((v) => this.appInfo.appName = v);
    this.appVersion.getPackageName().then((v) => this.appInfo.packageName = v);
    this.appVersion.getVersionCode().then((v) => this.appInfo.versionCode = v);
    this.appVersion.getVersionNumber().then((v) => this.appInfo.versionNumber = v);
  }

}
