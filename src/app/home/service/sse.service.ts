import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {IMessage} from "../IMessage";

@Injectable({
  providedIn: 'root'
})
export class SseService {

  constructor() { }

  createEventSource(): Observable<IMessage> {
    const eventSource = new EventSource('http://localhost:8080/sse');

    return new Observable(observer => {
      eventSource.onmessage = event => {
        if(event.data === 'CLOSE') {
          eventSource.close();
          observer.unsubscribe()
          return
        }
        observer.next(JSON.parse(event.data));
      };
    });
  }
}
