import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../model/Product";
import {Observable} from "rxjs";
import {Category} from "../model/Category";
import {Brand} from "../model/Brand";
import {ImageURL} from "../model/ImageURL";
import {ProductDTO} from "../model/productDTO";



@Injectable({
  providedIn: 'root'
})
export class ProductService {



  constructor(private httpClient: HttpClient) { }
  findAllProducts(): Observable<ProductDTO[]>{
    return this.httpClient.get<ProductDTO[]>("http://localhost:8081/api/products")
  }
  createProduct(product?: Product): Observable<Product>{
    return this.httpClient.post<Product>("http://localhost:8081/api/products", product)
  }
  getProductById(id?: number): Observable<Product>{
    return this.httpClient.get<Product>("http://localhost:8081/api/products/" + id)
  }
  updateProduct(product?: Product): Observable<Product>{
    return this.httpClient.put<Product>("http://localhost:8081/api/products" ,product)
  }
  deleteProduct(id?: number): Observable<Product>{
    return this.httpClient.delete("http://localhost:8081/api/products/" + id)
  }
  findAllCategories(): Observable<Category[]>{
    return this.httpClient.get<Category[]>("http://localhost:8081/api/categories")
  }
  findAllBrands(): Observable<Brand[]>{
    return this.httpClient.get<Category[]>("http://localhost:8081/api/brands")
  }
  findBrandByCategory(id?: number): Observable<Brand[]>{
    return this.httpClient.get<Category[]>("http://localhost:8081/api/brands/" + id)
  }
  saveImage(image?: ImageURL): Observable<ImageURL>{
    return this.httpClient.post<ImageURL>("http://localhost:8081/api/products/imageURL", image)
  }
  getNewProductId(){
    return this.httpClient.get<any>("http://localhost:8081/api/products/new-product")
  }

}
