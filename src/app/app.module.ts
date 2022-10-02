import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, RoutingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { ShopComponent } from './shop/shop.component';
import {HomeComponent} from "./home/home.component";
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminComponent } from './admin/admin.component';
import { AdminTableComponent } from './admin-table/admin-table.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShopComponent,
    RoutingComponent,
    ShoppingCartComponent,
    LoginRegisterComponent,
    PageNotFoundComponent,
    AdminComponent,
    AdminTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
