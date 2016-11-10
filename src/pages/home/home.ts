import { Http } from '@angular/http';
import { ChatsPage } from '../chat/chats';
import { Component } from '@angular/core';
import { Facebook } from 'ionic-native';
import { NavController } from 'ionic-angular';
import 'rxjs/Rx';

import firebase from 'firebase';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userProfile: any = null;
  imageUrl = 'assets/img/avatar/avatar-placeholder.png';
  placeHolder = 'assets/img/avatar/ian-avatar.png';
  constructor(public navCtrl: NavController, public http: Http) {
    this.getImage();
  }

  getImage() {
    this.http.get('https://randomuser.me/api/?results=' + 1)
      .map(data => {
        data.json()
      })
      .subscribe(result => {
        console.log(result);
      })
  }

  googleLogin() {
    this.navCtrl.push(ChatsPage);
  }

  facebookLogin() {
    Facebook.login(['email']).then((response) => {
      let facebookCredential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);

      firebase.auth().signInWithCredential(facebookCredential)
        .then((user) => {
          alert("Firebase user: " + JSON.stringify(user));
          this.userProfile = user;
          this.navCtrl.push(ChatsPage, { user: this.userProfile });
        })
        .catch((error) => {
          alert("Firebase failure: " + JSON.stringify(error));
        });

    }).catch((error) => { console.log(error) });
  }
}
