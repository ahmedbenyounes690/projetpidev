import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '@app/_services/chat.service';
import { Socket } from 'ngx-socket-io';
import { Chat } from '@app/_models/chat';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  claimID: string = '';
  receiverID: string = '';  // Vous devrez définir cette valeur quelque part
  message: string = '';
  messages: Chat[] = [];

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private socket: Socket
  ) { }

  ngOnInit() {
    this.claimID = this.route.snapshot.paramMap.get('claimID') || '';

    this.socket.emit('joinRoom', { claimID: this.claimID });

    this.chatService.getMessages(this.claimID).subscribe((msgs: Chat[]) => {
      this.messages = msgs;
    });

    this.socket.fromEvent<Chat>('receive message').subscribe((msg: Chat) => {
      this.messages.push(msg);
    });
  }

  sendMessage() {
    this.chatService.sendMessage(this.claimID, this.receiverID, this.message).subscribe(() => {
      this.message = '';
    });
  }
}