import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '@app/_services/chat.service';
import { Chat } from '@app/_models/chat';
import { Socket } from 'ngx-socket-io'; // Assuming you're using ngx-socket-io for socket management
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messageForm!: FormGroup;
  chatID: string = '';
  messages: Chat[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private chatService: ChatService,
    private route: ActivatedRoute
  ) {
    this.messageForm = this.formBuilder.group({
      message: ['', Validators.required]
    });
  }
  ngOnInit() {
    this.chatID = this.route.snapshot.paramMap.get('id') || '';
  
    this.chatService.getMessages(this.chatID).subscribe((msgs: Chat[]) => {
      console.log(msgs);  // Ajoutez cette ligne pour vérifier les messages récupérés
      this.messages = msgs;
    });
  }

  onSubmit() {
    if (this.messageForm.valid) {
      const message = this.messageForm.get('message')?.value?.toString();
      const receiverID = '666a53a5ec155ffd4e208d71'; // Change this to the appropriate receiverID
      this.chatService.sendMessage(this.chatID, receiverID, message).subscribe(response => {
        this.chatService.getMessages(this.chatID).subscribe((msgs: Chat[]) => {
          this.messages = msgs;
        });
        this.messageForm.reset();
      });
    }
  }
}