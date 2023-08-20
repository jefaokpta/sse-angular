import { Component } from '@angular/core';
import {IMessage} from "../model/IMessage";
import {ListService} from "./service/list.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  list: Observable<IMessage[]>

  constructor(private listService: ListService) {
    this.list = listService.getMessages();
  }

}
