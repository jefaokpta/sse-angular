import {Injectable, NgZone} from '@angular/core';
import {Observable} from "rxjs";
import {IMessage} from "../../model/IMessage";

@Injectable({
  providedIn: 'root'
})
export class SseService {

  private eventSource?: EventSource

  constructor(private ngZone: NgZone) { }

  createEventSource(): Observable<IMessage> {
    this.eventSource = new EventSource('http://localhost:8080/sse');
    return new Observable(observer => {
      this.eventSource!!.addEventListener('message', event => {
        this.ngZone.run(() => {
          observer.next(JSON.parse(event.data))
        })
      })
      this.eventSource!!.addEventListener('close', () => {
        this.eventSource!!.close();
        observer.unsubscribe()
      })
    });
  }

  closeEventSource() {
    this.eventSource?.close();
  }
}
