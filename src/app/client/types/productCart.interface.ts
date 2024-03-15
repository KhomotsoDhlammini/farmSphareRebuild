import {ProductInterface} from 'src/app/shared/types/product.interface'

export interface ProductCartInterface {
  id: string
  count: number
  product: ProductInterface
}
