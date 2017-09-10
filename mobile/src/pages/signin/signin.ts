import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../_classes/list/user';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';

/**
 * Generated class for the SigninPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  homePage = HomePage;
  user: User = new User();
  message: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authProvider: AuthProvider) {
    this.setMessage();
  }

  ionViewDidLoad() {    
    if (!this.authProvider.isSignedIn)
      this.authProvider.isSign().then(() => this.setMessage());
  }

  setMessage() {
    this.message = 'Авторизация ' + (this.authProvider.isSignedIn ? 'выполнена' : 'не выполнена') + '!';
  }

  signin() {
    this.message = 'Авторизация ...';    
    this.authProvider.signin(this.user).then((user: User) => this.setMessage());
  }

  signout() {
    this.authProvider.signout().then(() => this.setMessage());
  }

  goHomePage(){
    this.navCtrl.setRoot(this.homePage);
  }

}