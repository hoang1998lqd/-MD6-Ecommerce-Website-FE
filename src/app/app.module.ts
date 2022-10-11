import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

import { FormCreateProductComponent } from './form-create-product/form-create-product.component';
import {MatSelectModule} from "@angular/material/select";
// @ts-ignore
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {environment} from "../environments/environment";
// @ts-ignore
import {AngularFireAuth, AngularFireAuthModule} from "@angular/fire/compat/auth";
// import {AngularFireAuth} from "@angular/fi"
// @ts-ignore
import {AngularFireModule} from "@angular/fire/compat";
import {BrowserModule} from "@angular/platform-browser";
import { SingleProductComponent } from './single-product/single-product.component';
import { CheckoutComponent } from './checkout/checkout.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {NgxPaginationModule} from "ngx-pagination";


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
    AdminTableComponent,
    FormCreateProductComponent,
    SingleProductComponent,
    CheckoutComponent

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatTableModule,
        MatSelectModule,
        AngularFireStorageModule,
        AngularFireAuthModule,
        // Khởi tạo vào gọi tới Environment được khai báo biến ở trong environment
        AngularFireModule.initializeApp(environment.firebaseConfig),
        MatPaginatorModule,
        MatSortModule,
        MatCheckboxModule,
        NgxPaginationModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
