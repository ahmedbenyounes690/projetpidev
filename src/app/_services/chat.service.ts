import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Chat } from '@app/_models/chat';

@Injectable({ providedIn: 'root' })
export class ChatService {
    private baseUrl = `${environment.apiUrl}/chat`;

    constructor(private http: HttpClient) { }

    getMessages(claimID: string): Observable<Chat[]> {
        return this.http.get<Chat[]>(`${this.baseUrl}/${claimID}`);
    }

    sendMessage(claimID: string, receiverID: string, message: string): Observable<any> {
        return this.http.post(this.baseUrl, { claimID, receiverID, message });
    }
}