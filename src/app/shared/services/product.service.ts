import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable, map} from 'rxjs'
import {ProductInterface} from '../types/product.interface'
import {environment} from 'src/environments/environment.development'

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  // get all products by farm
  getProductsByFarm(farmID: string): Observable<ProductInterface[]> {
    const SERVER = environment.SERVER_URL
    return this.http.get<ProductInterface[]>(SERVER + `/products/list/${farmID}`)
  }

  deleteProduct(productID: string): Observable<void> {
    const SERVER = environment.SERVER_URL;
    return this.http.delete<void>(`${SERVER}/products/${productID}`);
  }
  

  addProduct(productData: any): Observable<any> {
    const SERVER = environment.SERVER_URL;
  
    // Send a POST request to create a new farm
    return this.http.post<any>(`${SERVER}/products/addProduct`, productData).pipe(
      map(res => {
        console.log('Response from server about adding a farm:', res);
        return res;
      })
    );
  }
}
