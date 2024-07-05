import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Chat } from '@app/_models/chat';
@Injectable({
    providedIn: 'root'
  })
  export class ChatService {
    private apiUrl = 'votre-api-url'; // Remplacez par l'URL de votre API
  
    constructor(private http: HttpClient) {}
  
    getMessages(chatID: string): Observable<Chat[]> {
      return this.http.get<Chat[]>(`${this.apiUrl}/chats/${chatID}`);
    }
  
    sendMessage(chatID: string, receiverID: string, message: string): Observable<any> {
      const payload = { chatID, receiverID, message };
      return this.http.post<any>(`${this.apiUrl}/chats/send`, payload);
    }
  }