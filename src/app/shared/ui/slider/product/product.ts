import {NgIf} from '@angular/common'
import {Component, Input, OnInit} from '@angular/core'
import { Router } from '@angular/router'
import {CartService} from 'src/app/client/services/cart.service'
import { AlertService } from 'src/app/shared/services/alert.service'
import { ProductService } from 'src/app/shared/services/product.service'
import {ProductInterface} from 'src/app/shared/types/product.interface'

@Component({
  selector: 'share-product',
  templateUrl: './product.html',
  standalone: true,
  imports: [NgIf],
})
export class  Product {
  @Input() product!: ProductInterface
  @Input() showCardButton: boolean = true
  
  constructor(
    private cartService: CartService,
    private alert: AlertService,
    private productService: ProductService
  ) {}

  addToCart() {
    this.cartService.addToCartSignal(this.product);
  }

  deleteItem(productId: any) {
    this.productService.deleteProduct(productId).subscribe(
      () => {
        // Handle success, maybe show an alert or update the product list
        this.alert.success('Product deleted successfully.');
      },
      (error) => {
        // Handle error, show an alert or log it
        this.alert.error('Failed to delete product.');
        console.error(error);
      }
    );
  }
}