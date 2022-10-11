
import {Customer} from "./Customer";

export interface Orders {
  id?: number
  date_order?: Date
  date_ship?: Date
  description?: any
  status_exist?: number
  status_order?: number
  status_pay?: number
  customer?: Customer
  shop_id?: number
}
