import {
  Injectable,
  Signal,
  computed,
  signal,
} from '@angular/core'
import {ProductCartInterface} from '../types/productCart.interface'
import {ProductInterface} from 'src/app/shared/types/product.interface'
import {AlertService} from 'src/app/shared/services/alert.service'

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSignal = signal<ProductCartInterface[]>([])

  totalPrice: Signal<number> = computed(() =>
    this.cartSignal().reduce(
      (count, product) => product.product.productPrice * product.count + count,
      0
    )
  )

  constructor(private alert: AlertService) {}

  // return all product from the cart
  getCartSignal(): ProductCartInterface[] {
    return this.cartSignal()
  }

  // check if product exists in the cart
  isProductExist(product_id: number): boolean {
    const productsIdArray: number[] = this.cartSignal().map(
      (p) => p.product.productID
    )

    if (productsIdArray.includes(product_id)) {
      return true
    }

    return false
  }

  // add to a cart
  addToCartSignal(product: ProductInterface) {
    const id: string = Date.now().toString()
    const count = 1
    let cartData = this.getCartSignal()

    if (!this.isProductExist(product.productID)) {
      cartData = [...cartData, {id, count, product}]
      this.cartSignal.set(cartData)
      this.alert.success(`${product.productName} added to cart`)
      this.saveCartToStorage()
      return
    }

    this.alert.error(`${product.productName} already in the cart`)

    this.saveCartToStorage()
  }

  onIncrementItem(id: string) {
    let cartData = this.getCartSignal().map((p) =>
      p.id === id ? {...p, count: p.count + 1} : {...p}
    )

    this.cartSignal.set(cartData)

    this.saveCartToStorage()
  }

  onDecrementItem(id: string) {
    let product: ProductCartInterface = this.cartSignal().find(
      (p) => p.id === id
    ) as ProductCartInterface
    if (product.count === 1) {
      this.removeFromCart(id)
      return
    }

    let cartData = this.getCartSignal().map((p) =>
      p.id === id ? {...p, count: p.count - 1} : {...p}
    )

    this.cartSignal.set(cartData)

    this.saveCartToStorage()
  }

  removeFromCart(id: string) {
    const product = this.cartSignal().find((p) => p.id === id)
    let cartData = this.getCartSignal().filter((p) => p.id !== id)
    this.cartSignal.set(cartData)
    this.alert.success(`${product?.product.productName} removed from the cart`)

    this.saveCartToStorage()
  }

  getCardFromStorage() {
    if (localStorage.getItem('cart')) {
      const dataFromStorage: ProductCartInterface[] = JSON.parse(
        localStorage.getItem('cart') || ''
      ) as ProductCartInterface[]
      if (dataFromStorage.length > 0) {
        this.cartSignal.set(dataFromStorage)
      }
    }
  }

  saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(this.getCartSignal()))
  }

  clearCart() {
    localStorage.removeItem('cart')
    this.cartSignal.set([])
  }
}
