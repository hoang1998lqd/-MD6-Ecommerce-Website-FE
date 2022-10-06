import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }
  findAllOrder(): Observable<any> {
    return  this.httpClient.get<any>("http://localhost:8081/api/orders")
  }
}
