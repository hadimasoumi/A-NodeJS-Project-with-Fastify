import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseMessagingService {
  token: string = null;
  currentToken = new BehaviorSubject(null);
  currentMessage = new BehaviorSubject(null);

  constructor(private angularFireMessaging: AngularFireMessaging) {}

  requestPermission(): string {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        console.log('requestToken ---> ', token);
        if (token && token != null && token != '' && this.token != token) {
          this.token = token;
          this.currentToken.next(token);
        }
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );

    return this.token;
  }

  receiveMessage() {
    this.angularFireMessaging.messages.subscribe((payload) => {
      console.log('fcm message ---> ', payload);
      this.currentMessage.next(payload);
    });
  }
}
