import { CommonModule, NgFor } from '@angular/common'
import { Component } from '@angular/core'
import { CartItem } from '../../ui/cartItem/cartItem'
import { CartService } from '../../../shared/services/cart.service'
import { NavigateService } from 'src/app/shared/services/navigate.service'
import { BackButton } from 'src/app/shared/ui/backButton'
import { OrderService } from 'src/app/shared/services/order.service'
import { OrderProduct, OrderRequest } from 'src/app/shared/types/order.interface'
import { UserService } from 'src/app/shared/services/user.service'
import { AlertService } from 'src/app/shared/services/alert.service'

@Component({
  selector: 'client-cartPage',
  templateUrl: './cart.html',
  styleUrls: ['../client.scss'],
  standalone: true,
  imports: [CommonModule, CartItem, NgFor, BackButton],
})
export class CartPage {

  constructor(public cartService: CartService, public userService: UserService, public orderService: OrderService,
    private alert: AlertService, public navigateService: NavigateService) { }

  createNewOrder() {
    // BUILD REQUEST
    const request = {
      consumerID: this.userService.getUserSignal()?.id,
      farmerID: this.cartService.getCartFarmSignal().farmerID,
      farmID: this.cartService.getCartFarmSignal().farmID,
      orderStatus: "new",
      orderPrice: this.cartService.totalPrice(),
      orderDate: new Date(),
      orderProductList: []   // initialize
    } as OrderRequest

    // iterate throught all cart products
    for (let item of this.cartService.getCartSignal()) {
      const orderProduct = {
        productID: item.product.productID,
        productName: item.product.productName,
        productPrice: item.product.productPrice,
        count: item.count
      } as OrderProduct;

      // push to list
      request.orderProductList.push(orderProduct);
    }

    // SEND REQUEST
    this.orderService.createNewOrder(request).subscribe(
      (response) => {
        // Handle success, maybe show a success message or redirect to another page
        this.alert.success('Succefully added a order');

        // empty cart
        this.cartService.clearCart();

        // NAVIGATE TO order SENT SCREEN
        this.navigateService.to("/client/checkout/"+response);
      },
      (error) => {
        console.log(error)
        this.alert.error('Error creating a order')
      }
    );

  }
}
