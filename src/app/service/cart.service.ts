import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Item} from "../model/Item";

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
}
