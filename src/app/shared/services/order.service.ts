import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable, map} from 'rxjs'
import {environment} from 'src/environments/environment.development'
import { OrderDetails, OrderRequest, OrderStatusRequest } from '../types/order.interface'

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  updateOrderStatus(orderStatusRequest: OrderStatusRequest): Observable<any> {
    const SERVER = environment.SERVER_URL;
  
    // Send a PUT request to update status
    return this.http.put<OrderStatusRequest>(`${SERVER}/orders/updateStatus`, orderStatusRequest).pipe(
      map(res => {
        console.log('Response from server about updating status:', res);
        return res;
      })
    );
  }

  createNewOrder(orderRequest: OrderRequest): Observable<any> {
    const SERVER = environment.SERVER_URL;
  
    // Send a POST request to create a new order
    return this.http.post<OrderRequest>(`${SERVER}/orders/createOrder`, orderRequest).pipe(
      map(res => {
        console.log('Response from server about adding an order:', res);
        return res;
      })
    );
  }

  getOrderById(orderId:string): Observable<any> {
    const SERVER = environment.SERVER_URL;
  
    // Send a GET request to order by ID
    return this.http.get<OrderDetails>(`${SERVER}/orders/${orderId}`).pipe(
      map(res => {
        return res;
      })
    );
  }

  getOrderListByCustomerId(customerID:string): Observable<any> {
    const SERVER = environment.SERVER_URL;
  
    // Send a GET request to get customer orders
    return this.http.get<OrderDetails>(`${SERVER}/orders/customer/${customerID}`).pipe(
      map(res => {
        return res;
      })
    );
  }

  getOrderListByFarmerId(farmerID:string): Observable<any> {
    const SERVER = environment.SERVER_URL;
  
    // Send a GET request to get customer orders
    return this.http.get<OrderDetails>(`${SERVER}/orders/farmer/${farmerID}`).pipe(
      map(res => {
        return res;
      })
    );
  }

  getAllOrderProductsByOrderId(orderID:number): Observable<any> {
    const SERVER = environment.SERVER_URL;
  
    // Send a GET request to get customer orders
    return this.http.get<OrderDetails>(`${SERVER}/orders/products/${orderID}`).pipe(
      map(res => {
        return res;
      })
    );
  }
}
