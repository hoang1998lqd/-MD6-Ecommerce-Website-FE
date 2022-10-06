import {Product} from "./Product";
import {ImageURL} from "./ImageURL";

export interface ProductDTO {
  product?: Product
  imageURLS?: ImageURL[]
}
