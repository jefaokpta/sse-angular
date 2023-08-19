import {Component, OnInit} from '@angular/core';
import {SseService} from "./service/sse.service";
import {IMessage} from "./IMessage";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  messages: IMessage[] = [];

  constructor(private sseService: SseService) {}

  ngOnInit() {
    this.sseService.createEventSource().subscribe({
      next: message => {
        this.messages.push(message)
      }
    })
  }

}
