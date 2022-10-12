import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Voucher} from "../model/Voucher";
import {Product} from "../model/Product";

@Injectable({
  providedIn: 'root'
})
export class VoucherService {

  constructor(private httpClient: HttpClient) {
  }

  findAllByStore_Id(idCustomer?: number): Observable<Voucher[]> {
    return this.httpClient.get<Voucher[]>("http://localhost:8081/api/voucher/find-voucher/" + idCustomer)
  }

  createVoucher(voucher?: Voucher): Observable<Voucher> {
    return this.httpClient.post<Voucher>("http://localhost:8081/api/voucher", voucher)
  }

  updateVoucher(voucher?: Voucher): Observable<Voucher> {
    return this.httpClient.put<Voucher>("http://localhost:8081/api/voucher/update-voucher", voucher)
  }

  deleteVoucher(id?: number): Observable<Voucher> {
    return this.httpClient.delete("http://localhost:8081/api/voucher/delete-voucher" + id)
  }
  findAll(): Observable<Voucher[]>{
    return this.httpClient.get<Voucher[]>("http://localhost:8081/api/voucher")
  }
}
