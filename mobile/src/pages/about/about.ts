import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';
import { Info } from '../../_classes/info';
import { ENV } from '@environment';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  appInfo: Info = new Info();

  constructor(public navCtrl: NavController,
              private appVersion: AppVersion) { }

  ionViewDidLoad() {
    if (!ENV.DEV) {
      this.appVersion.getAppName().then((v) => this.appInfo.appName = v);
      this.appVersion.getVersionNumber().then((v) => this.appInfo.versionNumber = v);
    }
  }

}
