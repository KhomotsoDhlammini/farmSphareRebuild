import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable, map} from 'rxjs'
import {environment} from 'src/environments/environment.development'
import {FarmInterface} from '../types/farm.interface'

@Injectable({
  providedIn: 'root',
})
export class FarmService {
  constructor(private http: HttpClient) {}

  // get frams
  getFarmsFn(): Observable<FarmInterface[]> {
    const SERVER = environment.SERVER_URL

    return this.http.get<FarmInterface[]>(SERVER + '/farm/farms')
  }

  // get a single fram detail
  getSingleFarmDetailFn(id: string): Observable<FarmInterface> {
    const SERVER = environment.SERVER_URL

    return this.http.get<FarmInterface>(SERVER + `/farm/${id}`)
  }

  getFarmerFarms(farmerID: number | undefined): Observable<FarmInterface[]> {
    const SERVER = environment.SERVER_URL

    return this.http.get<FarmInterface[]>(
      SERVER + `/farm/farmerFarms/${farmerID}`
    )
  }

  createFarm(farmData: any): Observable<any> {
    const SERVER = environment.SERVER_URL;
  
    // Send a POST request to create a new farm
    return this.http.post<any>(`${SERVER}/farm/addNewFarm`, farmData).pipe(
      map(res => {
        console.log('Response from server about adding a farm:', res);
        return res;
      })
    );
  }


  getUserLocation(): Observable<any> {
    // Use Geolocation API to get user's location
    return new Observable(observer => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoordinates = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          observer.next(userCoordinates);
          observer.complete();
        },
        (error) => observer.error(error)
      );
    });
  }

  getFarmsWithinRadius(userCoordinates: any): Observable<any> {
    const SERVER = environment.SERVER_URL;
    // Send user coordinates and radius to the backend and get filtered farms
    return this.http.post(`${SERVER}/farm/filtered`, userCoordinates);
  }


  
}
