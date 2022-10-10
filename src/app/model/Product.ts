import {Brand} from "./Brand";
import {Category} from "./Category";
import {Customer} from "./Customer";

export interface Product {
  id?: number
  name?: string
  price?: number
  amount?: number
  color?: string
  description?: string
  status?: number
  discount?: number
  brand?: Brand
  category?: Category
  customer?: Customer
}



