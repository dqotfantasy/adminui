import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  currentMessage = new BehaviorSubject(null);
  constructor(private angularFireMessaging: AngularFireMessaging, private api: ApiService) {
  }
  requestPermission() {
    this.angularFireMessaging.requestPermission.subscribe((token) => {

    },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }

    );
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        if (token) {
          this.saveToken(token);
        }
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        console.log('new message received. ', payload);
        this.currentMessage.next(payload);
      },
      (err) => {
        console.error('Unable to get permission to notify1.', err);
      });
  }
  async saveToken(token) {
    const v: any = await this.api.post('users/fcm', { fcmTokens: token }).toPromise();
  }
}