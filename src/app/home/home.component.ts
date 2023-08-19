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

  constructor(private sseService: SseService) { }

  ngOnInit() {
    this.messages.push({messageId: '1', text: 'test', datetime: 123});
    this.sseService.createEventSource().subscribe({
      next: message => {
        console.log(message)
        // this.messages = [...this.messages, message]
        this.messages.push(message)
        console.log(this.messages.length)
      }
    })
  }

}
