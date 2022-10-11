import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Item} from "../model/Item";
import {OrderDetail} from "../model/OrderDetail";
import {DTOItem} from "../model/DTOItem";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient: HttpClient) { }

  findAllItemByCustomerId(id?: number): Observable<Item[]>{
    return this.httpClient.get<Item[]>("http://localhost:8081/api/carts/item/" + id)
  }
  updateItemToCart(item : Item): Observable<Item>{
    return this.httpClient.put<Item>("http://localhost:8081/api/carts/item", item)
  }
  saveItemToCart(item : Item):Observable<Item>{
    return this.httpClient.post<Item>("http://localhost:8081/api/carts/item", item)
  }
  deleteItem(idItem?: number):Observable<Item>{
    return this.httpClient.delete("http://localhost:8081/api/carts/item/" + idItem)
  }

  // Tìm ra List ID của cửa hàng có tồn tại trong List Item trong giỏ hàng của người đang đăng nhập
  findListIdShop(idCustomerCurrent ?: number):Observable<any>{
    return this.httpClient.get<any>("http://localhost:8081/api/carts/item&" + idCustomerCurrent);
  }

  // Tìm ra List Item của người đang đăng nhập được chia ra dựa vào Id của Cửa hàng
  findAllItemByIdShop(idShop ?: number, idCustomer ?: number):Observable<Item[]>{
    return this.httpClient.get<Item[]>("http://localhost:8081/api/carts/item/list-shop/" + idShop+"&"+idCustomer);
  }

  //Find All DTOItem.ts theo id của người đang đăng nhập
  findAllDTOItem(idCustomer ?:number):Observable<DTOItem[]>{
    return this.httpClient.get<DTOItem[]>("http://localhost:8081/api/carts/dtoItem/" + idCustomer)
  }
}
