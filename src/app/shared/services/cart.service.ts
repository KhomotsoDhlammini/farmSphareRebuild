import {
  Injectable,
  Signal,
  computed,
  signal,
} from '@angular/core'
import { CartFarmDetails, ProductCartInterface } from '../../client/types/productCart.interface'
import { ProductInterface } from 'src/app/shared/types/product.interface'
import { AlertService } from 'src/app/shared/services/alert.service'

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSignal = signal<ProductCartInterface[]>([])
  private cartFarmSignal = signal<CartFarmDetails>({} as CartFarmDetails)

  //constants keys
  private cartFarmConst: string = "cartFarm";
  private cartConst: string = "cart";

  totalPrice: Signal<number> = computed(() =>
    this.cartSignal().reduce(
      (count, product) => product.product.productPrice * product.count + count,
      0
    )
  )

  constructor(private alert: AlertService) { }

  // return all product from the cart
  getCartSignal(): ProductCartInterface[] {
    return this.cartSignal()
  }

  // return all product from the cart
  getCartFarmSignal(): CartFarmDetails {
    return this.cartFarmSignal();
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
  addToCartSignal(product: ProductInterface, farmID: string, farmerID: string) {
    const id: string = Date.now().toString()
    const count = 1
    let cartData = this.getCartSignal()

    if (!this.isProductExist(product.productID)) {
      cartData = [...cartData, { id, count, product }]
      this.cartSignal.set(cartData)
      this.cartFarmSignal.set({ farmerID: +farmerID, farmID: +farmID });  // to keep track of the farm details
      this.alert.success(`${product.productName} added to cart`)
      this.saveCartToStorage()
      return
    }

    this.alert.error(`${product.productName} already in the cart`)

    this.saveCartToStorage()
  }

  onIncrementItem(id: string) {
    let cartData = this.getCartSignal().map((p) =>
      p.id === id ? { ...p, count: p.count + 1 } : { ...p }
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
      p.id === id ? { ...p, count: p.count - 1 } : { ...p }
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

  getCardFarmFromStorage() {
    if (localStorage.getItem(this.cartFarmConst)) {
      const data = JSON.parse(localStorage.getItem(this.cartFarmConst) || '') as CartFarmDetails;

      // add back to signal
      if(data) {
        this.cartFarmSignal.set(data);
      }
    }
  }

  getCardFromStorage() {
    if (localStorage.getItem(this.cartConst)) {
      const dataFromStorage: ProductCartInterface[] = JSON.parse(
        localStorage.getItem(this.cartConst) || ''
      ) as ProductCartInterface[]
      if (dataFromStorage.length > 0) {
        this.cartSignal.set(dataFromStorage)
      }
    }
  }

  saveCartToStorage() {
    localStorage.setItem(this.cartConst, JSON.stringify(this.getCartSignal()));
    localStorage.setItem(this.cartFarmConst, JSON.stringify(this.cartFarmSignal()))
  }

  clearCart() {
    localStorage.removeItem(this.cartConst)
    localStorage.removeItem(this.cartFarmConst)
    this.cartSignal.set([])
    this.cartFarmSignal.set({} as CartFarmDetails)
  }
}
