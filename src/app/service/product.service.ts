import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../model/Product";
import {Observable} from "rxjs";
import {Category} from "../model/Category";
import {Brand} from "../model/Brand";
import {ImageURL} from "../model/ImageURL";

import {ProductDTO} from "../model/ProductDTO";


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) {
  }

  findAllProducts(): Observable<ProductDTO[]> {
    return this.httpClient.get<ProductDTO[]>("http://localhost:8081/api/products")
  }


  createProduct(product?: Product): Observable<Product> {
    return this.httpClient.post<Product>("http://localhost:8081/api/products", product)
  }

  getProductById(id?: number): Observable<Product> {
    return this.httpClient.get<Product>("http://localhost:8081/api/products/" + id)
  }

  updateProduct(product?: Product): Observable<Product> {
    return this.httpClient.put<Product>("http://localhost:8081/api/products", product)
  }

  deleteProduct(id?: number): Observable<Product> {
    return this.httpClient.delete("http://localhost:8081/api/products/" + id)
  }

  findAllCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>("http://localhost:8081/api/categories")
  }

  findAllBrands(): Observable<Brand[]> {
    return this.httpClient.get<Brand[]>("http://localhost:8081/api/brands")
  }

  findBrandByCategory(id?: number): Observable<Brand[]> {
    return this.httpClient.get<Brand[]>("http://localhost:8081/api/brands/" + id)
  }

  saveImage(image?: ImageURL): Observable<ImageURL> {

    return this.httpClient.post<ImageURL>("http://localhost:8081/api/products/imageURL", image)
  }

  getNewProductId() {
    return this.httpClient.get<any>("http://localhost:8081/api/products/new-product")
  }


  updateImage(img?: ImageURL): Observable<ImageURL> {
    return this.httpClient.put<ImageURL>("http://localhost:8081/api/products/update-img", img)
  }

  getIdImageUpdate(id?: number): Observable<any> {
    return this.httpClient.get<any>("http://localhost:8081/api/products/product-update/" + id)
  }

  findAllProductByCustomerId(id?: number): Observable<ProductDTO[]> {
    return this.httpClient.get<ProductDTO[]>("http://localhost:8081/api/products/customer/" + id)
  }

  findAllProductNotCustomerId(idCustomer?: number): Observable<ProductDTO[]> {
    return this.httpClient.get<ProductDTO[]>("http://localhost:8081/api/products/not-customer/" + idCustomer)
  }

  findProductByName(idCustomer?: any, name?: string): Observable<ProductDTO[]> {
    return this.httpClient.get<ProductDTO[]>("http://localhost:8081/api/products/find-name-products/" + name + "&" + idCustomer);
  }

  // @ts-ignore
  findProductByPrice(idCustomer?: any, priceMin: number, priceMax: number): Observable<ProductDTO[]> {
    return this.httpClient.get<ProductDTO[]>("http://localhost:8081/api/products/find-by-price/" + priceMin + "&" + priceMax + "&" + idCustomer)
  }

  // @ts-ignore
  findProductByCategory(idCustomer?: any, id: number): Observable<ProductDTO[]> {
    return this.httpClient.get<ProductDTO[]>("http://localhost:8081/api/products/find-by-id/" + id + "&" + idCustomer)
  }


}
