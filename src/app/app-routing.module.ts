import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ShopComponent} from "./shop/shop.component";
import {HomeComponent} from "./home/home.component";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";

const routes: Routes = [
  {
    path:"", component: HomeComponent,
  },
  {
    path:"shop", component: ShopComponent,
    children: [
      {
        path: "shopping-cart", component: ShoppingCartComponent
      },
      {
        path: "", component: HomeComponent
      }
    ]
  },
  {
    path:"shopping-cart", component: ShoppingCartComponent,
    children: [
      {
        path: "shop", component: ShopComponent
      },
      {
        path: "", component: HomeComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponent = [HomeComponent, ShopComponent, ShoppingCartComponent]
