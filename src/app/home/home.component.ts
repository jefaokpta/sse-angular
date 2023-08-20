import {Component} from '@angular/core';
import {SseService} from "./service/sse.service";
import {IMessage} from "../model/IMessage";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{

  messages: IMessage[] = [];
  private eventSourceSubscription: Subscription

  constructor(private sseService: SseService, private router: Router) {
    this.eventSourceSubscription = this.sseService.createEventSource().subscribe({
      next: message => {
        this.messages.push(message)
      }
    })
  }

  navigateToList() {
    this.sseService.closeEventSource();
    this.eventSourceSubscription.unsubscribe();
    this.router.navigate(['/list']);
  }

}
