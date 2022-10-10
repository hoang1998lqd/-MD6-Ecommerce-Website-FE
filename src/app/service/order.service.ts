import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Orders} from "../model/Orders";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }
  findAllOrder(): Observable<Orders[]> {
    return this.httpClient.get<Orders[]>("http://localhost:8081/api/orders")
  }

  updateOrder(order?: Orders): Observable<Orders> {
    return this.httpClient.put<Orders>("http://localhost:8081/api/orders", order)
  }

  findOrderById(id?: number): Observable<Orders> {
    return this.httpClient.get<Orders>("http://localhost:8081/api/orders" + id)
  }
}
