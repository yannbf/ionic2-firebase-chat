import { MessageService } from '../../../providers/message-service';
import { FormControl, FormBuilder } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { Content, LoadingController, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html'
})
export class MessagesPage {
  toUser = {
    _id: '534b8e5aaa5e7afc1b23e69b',
    pic: 'assets/img/avatar/ian-avatar.png',
    username: 'Venkman',
  }

  user = {
    id: 'peu',
    pic: 'assets/img/avatar/avatar-placeholder.png',
    name: 'Micropeology',
  };

  doneLoading = false;

  messages = [];

  @ViewChild(Content) content: Content;

  public messageForm: any;
  chatBox: any;
  chatId: any;
  constructor(public navCtrl: NavController, public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController, public navParams: NavParams,
    public messageService: MessageService) {
    this.chatId = this.navParams.get('chatId');
    this.messageForm = formBuilder.group({
      message: new FormControl('')
    });
    this.chatBox = "";
    this.loadMessages();

  }

  loading = true;

  loadMessages() {
    this.messageService.retrieveMessages(this.chatId).subscribe((data: Array<any>) => {
      this.messages = data;
      console.log(data);
    });
    setTimeout(() => {
      this.loading = false;
      setTimeout(() => {
        this.content.scrollToBottom();
      }, 0);
    }, 800);
  }

  send(message) {
    if (message && message != "") {
      //this.messageService.sendMessage(chatId, message);

      let messageData =
        {
          timestamp: new Date(),
          user: this.user,
          text: message
        }

      this.messageService.sendMessage(this.chatId, messageData);
      this.scrollToBottom();
    }
    this.chatBox = "";
  }

  scrollToBottom() {
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 100);
  }


  ngOnInit() {
  }

  viewProfile(profile) {
    console.log('oi');
  }
}
