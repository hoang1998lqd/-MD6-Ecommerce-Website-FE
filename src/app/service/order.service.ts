import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Order} from "../model/Order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }
  findAllOrder(): Observable<Order[]> {
    return this.httpClient.get<Order[]>("http://localhost:8081/api/orders")
  }

  updateOrder(order?: Order): Observable<Order> {
    return this.httpClient.put<Order>("http://localhost:8081/api/orders", order)
  }

  findOrderById(id?: number): Observable<Order> {
    return this.httpClient.get<Order>("http://localhost:8081/api/orders" + id)
  }
}
