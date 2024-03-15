import {Injectable, inject} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {
  AuthResponseInterface,
  LoginRequestInterface,
  RegisterRequestInterface,
} from './auth.interface'
import {environment} from 'src/environments/environment.development'
import {Observable, map} from 'rxjs'
import {UserInterface} from '../shared/types/user.interface'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient)

  // login
  onLoginFn(user: LoginRequestInterface): Observable<AuthResponseInterface> {
    const SERVER = environment.SERVER_URL

    return this.http.post<AuthResponseInterface>(
      `${SERVER}/auth/authenticate`,
      user
    )
  }

  // register
  onRegisterFn(user: RegisterRequestInterface): Observable<AuthResponseInterface> {
    const SERVER = environment.SERVER_URL

    return this.http.post<AuthResponseInterface>(
      `${SERVER}/auth/register`,
      user
    )
  }
}
