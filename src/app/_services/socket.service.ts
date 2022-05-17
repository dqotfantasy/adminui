import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket: io = io(environment.socket, {
    autoConnect: false,
    transportOptions: {
      polling: {
        extraHeaders: {
          Authorization: this.authService.token
        }
      }
    }
  });

  isConnected = false;

  constructor(private authService: AuthService) {
    this.socket.on('connect', () => {
      this.isConnected = true;
    });

    this.socket.on('disconnect', () => {
      this.isConnected = false;
    });

    this.socket.on('error', (e) => {
      console.log('Socket:' + e);
    });
  }

  connect() {
    this.socket.io.opts.transportOptions.polling.extraHeaders.Authorization = this.authService.token;
    this.socket.connect();
  }

  disconnect() {
    this.socket.disconnect();
    this.isConnected = false;
  }

  join(data) {
    this.socket.emit('join', data);
  }

  leave(room) {
    this.socket.emit('leave', room);
  }
}


