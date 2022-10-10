
import {Orders} from "./Orders";
import {Product} from "./Product";

export interface OrderDetail {
  id?: number
  quantity?: number
  orders?: Orders
  product?: Product
}
