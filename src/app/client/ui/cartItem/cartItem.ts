import {Component, Input} from '@angular/core'
import {ProductCartInterface} from '../../types/productCart.interface'
import {NgIf} from '@angular/common'
import {CartService} from '../../services/cart.service'

@Component({
  selector: 'client-card-item',
  templateUrl: './cartItem.html',
  standalone: true,
  imports: [NgIf],
})
export class CartItem {
  @Input() productCard!: ProductCartInterface

  constructor(public cartService: CartService) {}

  onIncrement() {
    this.cartService.onIncrementItem(this.productCard.id)
  }

  onDecrement() {
    this.cartService.onDecrementItem(this.productCard.id)
  }

  onDeleteItem() {
    this.cartService.removeFromCart(this.productCard.id)
  }
}
