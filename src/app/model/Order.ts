import {Customer} from "./Customer";

export interface Order {
  id?: number
  date_order?: Date
  date_ship?: Date
  description?: string
  status_exist?: number
  status_order?: number
  status_pay?: number
  customer?: Customer
}

