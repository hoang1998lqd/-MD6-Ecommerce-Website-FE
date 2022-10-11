import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";
import {Customer} from "../model/Customer";
import {CustomerToken} from "../model/customer-token";
import {Cart} from "../model/Cart";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private currentCustomerSubject: BehaviorSubject<CustomerToken>;
  public currentCustomer: Observable<CustomerToken>;

  constructor(private httpClient: HttpClient) {
    // @ts-ignore
    this.currentCustomerSubject = new BehaviorSubject<CustomerToken>(JSON.parse(localStorage.getItem("currentCustomer")));
    this.currentCustomer = this.currentCustomerSubject.asObservable();
  }

  public get currentCustomerValue(): CustomerToken{
    return this.currentCustomerSubject.value;
  }

  findAllCustomer(): Observable<Customer[]>{
    return this.httpClient.get<Customer[]>("http://localhost:8081/api/customers")
  }

  findCustomerById(id?: number): Observable<Customer>{
    return this.httpClient.get<Customer>("http://localhost:8081/api/customers/find-customer-by-id/" + id)
  }

  createCustomer(customer?: Customer): Observable<Customer>{
    return this.httpClient.post<Customer>("http://localhost:8081/api/customers/signup", customer)
  }

  updateCustomer(id?: number, customer?: Customer): Observable<Customer>{
    return this.httpClient.put<Customer>("http://localhost:8081/api/customers/update-customer/" + id, customer)
  }

  deleteCustomer(id?: number){
    return this.httpClient.delete("http://localhost:8081/api/customers/delete-customer/" + id)
  }

  loginCustomer(email?: string, password?: string){
    // @ts-ignore
    return this.httpClient.post<any>("http://localhost:8081/api/customers/login/" + email + "-" + password)
      .pipe(map(customer =>{
        localStorage.setItem("currentCustomer", JSON.stringify(customer));
        // @ts-ignore
        this.currentCustomerSubject.next(customer);
        return customer;
      }))
  }

  logOutCustomer(){
    localStorage.removeItem("currentCustomer")
    localStorage.removeItem("username")
    localStorage.removeItem("roles")
    localStorage.removeItem("idCustomer")
    localStorage.removeItem("token")
    // @ts-ignore
    this.currentCustomerSubject.next(null);
  }
  createCart(cart ?: Cart):Observable<Cart>{
    return this.httpClient.post<Cart>("http://localhost:8081/api/carts",cart);
  }

  // Tìm kiếm người dùng có quyền bán hàng
  findAllCustomerHaveShop():Observable<Customer[]>{
    return  this.httpClient.get<Customer[]>("http://localhost:8081/api/customers/shop")
  }

}
