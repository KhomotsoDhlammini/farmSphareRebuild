import {CommonModule, NgFor} from '@angular/common'
import {Component} from '@angular/core'
import { CartItem } from '../../ui/cartItem/cartItem'
import { CartService } from '../../../shared/services/cart.service'
import { NavigateService } from 'src/app/shared/services/navigate.service'
import { BackButton } from 'src/app/shared/ui/backButton'

@Component({
  selector: 'client-cartPage',
  templateUrl: './cart.html',
  styleUrls: ['../client.scss'],
  standalone: true,
  imports: [CommonModule, CartItem, NgFor, BackButton],
})
export class CartPage {

  constructor(public  cartService: CartService, public navigateService: NavigateService) {}

  createNewOrder() { 
    console.log(this.cartService.getCartSignal())
  }
}
