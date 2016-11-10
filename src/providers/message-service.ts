import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import firebase from 'firebase';

@Injectable()
export class MessageService {

  constructor(private http: Http) { }

  createChat(chatData) {
    // var session = JSON.parse(window.localStorage['session'] || '{}');

    var newMessageKey = firebase.database().ref().child('chats').push().key;
    var updates = {};
    updates['/chats/' + newMessageKey] = chatData;

    return firebase.database().ref().update(updates);
  }

  retrieveChats() {
    var currentUser = firebase.auth().currentUser;
    console.log(currentUser);
    var ref = firebase.database().ref('chats');

    return new Observable(observer => {
      var query = ref.orderByChild("timestamp");
      query.on('value', (snapshot) => {
        var arr = [];

        snapshot.forEach(function (childSnapshot): any {
          var data = childSnapshot.val();
          data['id'] = childSnapshot.key;
          arr.push(data);
        });
        observer.next(arr);
      },
        (error) => {
          console.log('ERROR', error);
          observer.error(error);
        });
    });
  }

  retrieveMessages(id: any) {
    var ref = firebase.database().ref('messages/' + id);

    return new Observable(observer => {
      var query = ref.orderByChild("timestamp");
      query.on('value',
        (snapshot) => {
          var arr = [];

          snapshot.forEach(function (childSnapshot): any {
            var data = childSnapshot.val();
            data['id'] = childSnapshot.key;
            arr.push(data);
          });
          observer.next(arr);
        },
        (error) => {
          console.log('Error:', error);
          observer.error(error);
        });
    });
  }

  sendMessage(chatId, messageData) {
    var session = JSON.parse(window.localStorage['session'] || '{}');

    var newMessageKey = firebase.database().ref().child('messages').push().key;
    var updates = {};
    updates['/messages/' + chatId + '/' + newMessageKey] = messageData;

    return firebase.database().ref().update(updates);
  }
}
