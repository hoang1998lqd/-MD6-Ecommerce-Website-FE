import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Orders} from "../model/Orders";
import {Observable} from "rxjs";
import {OrderDetail} from "../model/OrderDetail";
import {Item} from "../model/Item";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpclient : HttpClient) { }

  createOrder(order ?: Orders): Observable<Orders>{
    return this.httpclient.post<Orders>("http://localhost:8081/api/orders",order);
  }

  rejectOrder(order ?: Orders): Observable<Orders>{
    return this.httpclient.put<Orders>("http://localhost:8081/api/orders",order);
  }
  createOrderDetail(orderDetails?: OrderDetail[]) : Observable<OrderDetail[]>{
    return  this.httpclient.post<OrderDetail[]>("http://localhost:8081/api/orders/order-detail",orderDetails)
  }

}
