import {Component, Input, OnInit} from '@angular/core'
import {Product} from './product/product'
import {NgFor, NgIf} from '@angular/common'
import { ProductService } from '../../services/product.service';
import { ProductInterface } from '../../types/product.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'share-slider',
  templateUrl: './slider.html',
  standalone: true,
  imports: [Product, NgFor, NgIf],
})
export class Slider implements OnInit {
  @Input() farmID!: string

  products: ProductInterface[] = []

  @Input() showCardButton: boolean = true

  constructor(private productService: ProductService, public userService: UserService) {}

  ngOnInit(): void {
    this.getProductsByFarm()
  }

  getProductsByFarm() {
    if (this.farmID) {
      this.productService.getProductsByFarm(this.farmID).subscribe(res => {
        this.products = res
      }, error => console.log(error))
    }
  }
}
