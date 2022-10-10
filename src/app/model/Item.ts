
import {Cart} from "./Cart";
import {Product} from "./product";

export interface Item {
  id?: number
  quantity?: number
  product?: Product
  cart?: Cart
}
