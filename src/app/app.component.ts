import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';

import firebase from 'firebase';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = HomePage;

  constructor(platform: Platform) {
    firebase.initializeApp({
      apiKey: "AIzaSyCvdOUR6-XK97DP0m67gxxB7y6BuYMm-h8",
      authDomain: "ionicbootcamp.firebaseapp.com",
      databaseURL: "https://ionicbootcamp.firebaseio.com",
      storageBucket: "ionicbootcamp.appspot.com",
      messagingSenderId: "852970232235"
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}
