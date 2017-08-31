import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { C } from '../../_classes/list/c';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the MapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

declare var google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  c: C;

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  constructor(public alertCtrl: AlertController,
              public navCtrl: NavController, 
              public navParams: NavParams) {
    this.c = this.navParams.get('c');
  }

  ionViewDidLoad(){
    this.initMap();
    this.calculateAndDisplayRoute();
  }

  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 11,
      streetViewControl: false,
      mapTypeControl: false,
      //center: {lat: 55.15402, lng: 61.42915}
    });

    this.directionsDisplay.setMap(this.map);
  }

  calculateAndDisplayRoute() {
    this.directionsService.route({
      origin: this.c.a_adr,
      destination: this.c.b_adr,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        this.showErrorAlert(`Маршрут не проложен! Ошибка: ${status}...`);
      }
    });
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
}