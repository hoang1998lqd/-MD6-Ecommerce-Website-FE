import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {CustomerService} from "../service/customer.service";
import {Observable} from "rxjs";

@Injectable()
export class JwtInterceptor implements HttpInterceptor{
  constructor(private customerService: CustomerService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentCustomer = this.customerService.currentCustomerValue;
    // @ts-ignore
    if (currentCustomer && currentCustomer.token){
      req = req.clone({
        setHeaders:{
          // @ts-ignore
          Authorization: `Bearer ${currentCustomer.token}`
        }
      })
    }
    return next.handle(req);
  }
}
