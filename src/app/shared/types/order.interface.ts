export interface OrderRequest {
  orderID? : number
  consumerID : number
  farmerID: number
  farmID: number
  orderStatus: OrderStatusType
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

export interface OrderDetails {
  orderID : number
  consumerID : number
  farmerID: number
  farmID: number
  orderStatus: OrderStatusType
  orderPrice: number
  orderDate: Date
}

type OrderStatusType = "Pending" | "Accepted" | "completed"
