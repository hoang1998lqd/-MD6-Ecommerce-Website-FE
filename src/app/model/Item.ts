
import {Cart} from "./Cart";
import {Product} from "./Product";

export interface Item {
  id?: number
  quantity?: number
  product?: Product
  cart?: Cart
}
