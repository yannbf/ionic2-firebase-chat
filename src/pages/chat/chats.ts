import { MessageService } from '../../providers/message-service';
import { MessagesPage } from './messages/messages';
import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import firebase from 'firebase';

@Component({
  templateUrl: 'chats.html',
})

export class ChatsPage {
  userProfile: any = null;
  chats = [];
  // {
  //   imageUrl: 'assets/img/avatar/marty-avatar.png',
  //   title: 'McFly',
  //   lastMessage: 'Hey, what happened yesterday?',
  //   timestamp: new Date()
  // },
  // {
  //   imageUrl: 'assets/img/avatar/ian-avatar.png',
  //   title: 'Venkman',
  //   lastMessage: 'Sup, dude',
  //   timestamp: new Date()
  // }
  //   , {
  //   imageUrl: 'assets/img/avatar/sarah-avatar.jpg',
  //   title: 'Sarah Mcconnor',
  //   lastMessage: 'You still ow me that pizza.',
  //   timestamp: new Date()
  // }]

  constructor(public navCtrl: NavController, public app: App,
    public messageService: MessageService, public navParams: NavParams) {
    this.userProfile = navParams.get('user');
  }


  ngOnInit() {
    this.messageService.retrieveChats()
      .subscribe((data: Array<any>) => {
        console.log(data);
        this.chats = data;
      }, (err) => {
        alert('there was an error: ' + err);
      });
  }

  viewMessages(chat) {
    this.navCtrl.push(MessagesPage, { chatId: chat.id });
  }

  newChat() {

    let chatData = {
      lastMessage: 'Say hi to my little friend..',
      timestamp: Date.now(),
      title: 'New Chat'
    }

    this.messageService.createChat(chatData);
  }

}
