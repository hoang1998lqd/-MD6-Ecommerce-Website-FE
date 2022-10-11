import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ShopComponent} from "./shop/shop.component";
import {HomeComponent} from "./home/home.component";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {LoginRegisterComponent} from "./login-register/login-register.component";
import {AdminComponent} from "./admin/admin.component";
import {AdminTableComponent} from "./admin-table/admin-table.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {SingleProductComponent} from "./single-product/single-product.component";
import {CheckoutComponent} from "./checkout/checkout.component";


const routes: Routes = [
  {
    path: "admin-table", component: AdminTableComponent,
  },
  {
    path: "admin", component: AdminComponent,
  },
  {
    path:"", component: HomeComponent
  },
  {
    path:"shop", component: ShopComponent,
    children: [
      {
        path: "shopping-cart", component: ShoppingCartComponent
      },
      {
        path: "", component: HomeComponent
      },
      {
        path: "login-register", component: LoginRegisterComponent
      },
      {
        path: "**", component: PageNotFoundComponent
      },
      {
        path: "single-product", component: SingleProductComponent
      }
    ]
  },
  {
    path: "single-product", component: SingleProductComponent
  },
  {
    path:"shopping-cart", component: ShoppingCartComponent,
    children: [
      {
        path: "shop", component: ShopComponent
      },
      {
        path: "", component: HomeComponent
      },
      {
        path: "login-register", component: LoginRegisterComponent
      },
      {
        path: "**", component: PageNotFoundComponent
      },
      {
        path: "checkout", component: CheckoutComponent
      }
    ]
  },
  {
    path: "checkout", component: CheckoutComponent
  },
  {
    path: "login-register", component: LoginRegisterComponent,
    children:[
      {
        path: "", component: HomeComponent
      },
      {
        path: "shop", component: ShopComponent
      },
      {
        path: "shopping-cart", component: ShoppingCartComponent
      },
      {
        path: "**", component: PageNotFoundComponent
      }
    ]
  },
  {
    path: "**", component: PageNotFoundComponent,
    children:[
      {
        path: "", component: HomeComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponent =
  [HomeComponent, ShopComponent, ShoppingCartComponent, LoginRegisterComponent,
    PageNotFoundComponent, AdminComponent, AdminTableComponent, SingleProductComponent,
  CheckoutComponent]
