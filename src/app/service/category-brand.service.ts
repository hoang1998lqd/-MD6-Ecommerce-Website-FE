import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ProductDTO} from "../model/ProductDTO";
import {HttpClient} from "@angular/common/http";
import {CategoryBrand} from "../model/CategoryBrand";

@Injectable({
  providedIn: 'root'
})
export class CategoryBrandService {

  constructor(private httpClient: HttpClient) { }

  findAllCategoryAndBrand(): Observable<CategoryBrand[]>{
    return this.httpClient.get<CategoryBrand[]>("http://localhost:8081/api/categories/brands")
  }
}
