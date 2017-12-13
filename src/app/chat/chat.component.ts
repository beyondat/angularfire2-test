import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface Item {
  name: string;
  position: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messageCollection: AngularFirestoreCollection<Item>;
  messages: Observable<Item[]>;

  public name: string;
  public position: string;
  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.getChatData();
    console.log('ChatComponent OnInit');
  }

  getChatData() {
    this.messageCollection = this.afs.collection('chat_message'); // a ref to the todos collection
    this.messages = this.messageCollection.valueChanges();
  }

  newMessage(message) {
    this.messageCollection.add({'name': this.name, 'position': this.position});
  }
}
