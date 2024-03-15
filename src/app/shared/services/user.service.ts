import {Injectable, signal} from '@angular/core'
import {UserInterface} from '../types/user.interface'
import {NavigateService} from './navigate.service'
import {CartService} from 'src/app/client/services/cart.service'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSignal = signal<UserInterface | null>(null)

  constructor(
    private navigate: NavigateService,
    private cartService: CartService
  ) {}

  // set user data in the state
  setUserSignal(user: UserInterface) {
    this.userSignal.set(user)
  }

  // get user data from the state
  getUserSignal(): UserInterface | null {
    return this.userSignal() ? this.userSignal() : null
  }

  // save user data to localstorage
  saveUserToStorageFn() {
    localStorage.setItem('user', JSON.stringify(this.userSignal()))
  }

  // get user data from storage if exists, then set it to state
  getUserFromStorageFn() {
    if (localStorage.getItem('user')) {
      const user: UserInterface = JSON.parse(
        localStorage.getItem('user') || ''
      ) as UserInterface

      this.setUserSignal(user)
    }
  }

  // logout
  logoutFn() {
    this.userSignal.set(null)
    this.cartService.clearCart()
    localStorage.clear()
    this.navigate.to('/public/login')
  }
}
