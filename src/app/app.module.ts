import { MessageService } from '../providers/message-service';
import { ImageHolder } from '../pages/img-custom';
import { MomentPipe } from '../pipes/moment/moment.pipe';
import { MessagesPage } from '../pages/chat/messages/messages';
import { ChatsPage } from '../pages/chat/chats';
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import firebase from 'firebase';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ChatsPage,
    MessagesPage,

    ImageHolder,

    MomentPipe,
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ChatsPage,
    MessagesPage,
  ],
  providers: [MessageService]
})
export class AppModule { }
