import {ProductInterface} from 'src/app/shared/types/product.interface'

export interface ProductCartInterface {
  id: string
  count: number
  product: ProductInterface
}

export interface CartFarmDetails {
  farmID: number
  farmerID: number
}
