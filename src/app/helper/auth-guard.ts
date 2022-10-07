import { Injectable } from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {CustomerToken} from "../model/customer-token";
import {CustomerService} from "../service/customer.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
   currentCustomer: CustomerToken | undefined;

  constructor(
    private router: Router,
    private customerService: CustomerService
  ) {
    this.customerService.currentCustomer.subscribe(
      currentCustomer => {
        this.currentCustomer = currentCustomer;
      }
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!!this.currentCustomer) {
      return true;
    } else {
      this.router.navigate(['login-register'], {queryParams: {returnUrl: state.url}});
      return false;
    }
  }
}
