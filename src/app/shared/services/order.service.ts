import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable, map} from 'rxjs'
import {environment} from 'src/environments/environment.development'
import { OrderRequest } from '../types/order.interface'

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

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
}
