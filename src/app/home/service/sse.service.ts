import {Injectable, NgZone} from '@angular/core';
import {Observable} from "rxjs";
import {IMessage} from "../IMessage";

@Injectable({
  providedIn: 'root'
})
export class SseService {

  constructor(private ngZone: NgZone) { }

  createEventSource(): Observable<IMessage> {
    const eventSource = new EventSource('http://localhost:8080/sse');

    return new Observable(observer => {
      eventSource.addEventListener('message', event => {
        this.ngZone.run(() => {
          observer.next(JSON.parse(event.data))
        })
      })
      eventSource.addEventListener('close', event => {
        eventSource.close();
        observer.unsubscribe()
      })
    });
  }
}
