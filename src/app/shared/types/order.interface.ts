export interface OrderRequest {
  orderID? : number
  consumerID : number
  farmerID: number
  farmID: number
  orderStatus: "new" | "accepted" | "completed"
  orderPrice: number
  orderDate: Date
  orderProductList : Array<OrderProduct>
}

export interface OrderProduct {
  orderProductID: number
  orderID: number
  productID: number
  productName: string
  productPrice: number
  count: number
}
