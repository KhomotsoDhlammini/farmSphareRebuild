export interface ProductRequestInterface {
  farmID: number
  productName: string
  productDescription: string
  productImageURL: string
  productPrice: number
}

export interface ProductInterface extends ProductRequestInterface {
  productID: number
}
