import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {first} from "rxjs";
import {IMessage} from "../../model/IMessage";

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }

  getMessages() {
    return this.http.get<IMessage[]>('http://localhost:8080/list')
      .pipe(
        first()
      )
  }
}
