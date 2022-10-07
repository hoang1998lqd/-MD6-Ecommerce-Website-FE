import {Injectable} from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad, Route,
  Router,
  RouterStateSnapshot, UrlSegment
} from "@angular/router";
import {CustomerToken} from "../model/customer-token";
import {CustomerService} from "../service/customer.service";

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate, CanActivateChild, CanLoad {
  currentCustomer: CustomerToken | undefined;

  constructor(private router: Router, private customerService: CustomerService) {
    this.customerService.currentCustomer.subscribe(
      next => {
        this.currentCustomer = next;
      }
    );
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let hasRoleAdmin = false;
    if (this.currentCustomer) {
      const roleList = this.currentCustomer.role;
      //Xác định quyền của người dùng
      // @ts-ignore
      for (const role of roleList) {
        if (role.authority === 'CUSTOMER') {
          hasRoleAdmin = true;
          break;
        }
        if (role.authority === 'SELLER') {
          hasRoleAdmin = true;
          break;
        }
        if (role.authority === 'ADMIN') {
          hasRoleAdmin = true;
          break;
        }
      }
      if (hasRoleAdmin) {
        return true;
      } else {
        this.customerService.logOutCustomer();
        this.router.navigate(['/','login'], {queryParams: {login: true}, queryParamsHandling: 'merge'});
        return false;
      }
    } else {
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/','login'], {queryParams: {returnUrl: state.url}});
      return false;
    }
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.currentCustomer) {
      const roleList = this.currentCustomer.role;
      let hasRoleAdmin = false;
      // @ts-ignore
      for (const role of roleList) {
        if (role.authority === 'CUSTOMER') {
          hasRoleAdmin = true;
          break;
        }
        if (role.authority === 'SELLER') {
          hasRoleAdmin = true;
          break;
        }
        if (role.authority === 'ADMIN') {
          hasRoleAdmin = true;
          break;
        }
      }
      return hasRoleAdmin;
    } else {
      // not logged in so redirect to login page with the return url
      this.router.navigate(['login'], {queryParams: {returnUrl: state.url}});
      return false;
    }
  }

  canLoad(route: Route, segments: UrlSegment[]) {
    return true;
  }
}
