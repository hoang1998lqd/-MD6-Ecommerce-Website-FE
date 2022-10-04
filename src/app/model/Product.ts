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
function changePrice(money :any){
  const formatter = new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'VND',
    // minimumFractionDigits: 2
  })
  return  formatter.format(money);
}


