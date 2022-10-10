import {Customer} from "./Customer";


import {Product} from "./product";

export interface Orders {
  id?: number
  date_order?: Date
  date_ship?: Date
  description?: string
  status_exist?: number
  status_order?: number
  status_pay?: number
  customer?: Customer
}



export interface Orders_Detail {
  product : Product;
  quantity: number;

}

