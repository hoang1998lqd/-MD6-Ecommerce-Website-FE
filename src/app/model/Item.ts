import {Product} from "./Product";
import {Cart} from "./Cart";

export interface Item {
  id?: number
  quantity?: number
  product?: Product
  cart?: Cart
}
