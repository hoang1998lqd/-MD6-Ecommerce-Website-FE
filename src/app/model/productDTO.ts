// @ts-ignore
import {Product} from "./product";
import {ImageURL} from "./ImageURL";

export interface ProductDTO{
  product?: Product,
  imageURLS?: ImageURL[]
}
