import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Orders} from "../model/Order";


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) {
  }

  findAllOrderByShop(idShop: number): Observable<Orders[]> {
    return this.httpClient.get<Orders[]>("http://localhost:8081/api/orders/shop/" + idShop)

  }

  findAllOrder(): Observable<Orders[]> {
    return this.httpClient.get<Orders[]>("http://localhost:8081/api/orders")
  }

  findOneOrder(): Observable<any> {
    return this.httpClient.get<any>("http://localhost:8081/api/orders/order-detail")
  }

  // tìm kiếm tất cả order-detail theo 1 order
  findAllOrderDetailByOrder(idOrder: number): Observable<any> {
    return this.httpClient.get<any>("http://localhost:8081/api/orders/order-detail-order/" + idOrder)
  }

  findAllOrderByCustomer(idCustomer: number): Observable<any> {
    return this.httpClient.get<any>("http://localhost:8081/api/orders/order-customer/"+idCustomer)
  }
}
