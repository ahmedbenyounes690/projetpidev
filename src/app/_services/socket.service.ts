import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(environment.apiUrl, {
      auth: {
        token: localStorage.getItem('token') // Assurez-vous que le token est stocké dans le localStorage
      }
    });

    this.socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from socket server');
    });
  }

  sendMessage(claimID: string, receiverID: string, message: string) {
    this.socket.emit('send message', { claimID, receiverID, message });
  }

  receiveMessages(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('receive message', (data) => {
        observer.next(data);
      });
    });
  }
}