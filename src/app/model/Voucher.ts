import {Customer} from "./Customer";

export interface Voucher {
  id?: number
  name?: string
  discount?: number
  quantity?: number
  customer?: Customer
}
