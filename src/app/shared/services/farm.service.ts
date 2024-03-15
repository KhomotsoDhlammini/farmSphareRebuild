import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
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
}
