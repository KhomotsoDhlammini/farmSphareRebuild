import {CommonModule, NgFor, NgIf} from '@angular/common'
import {Component, OnInit} from '@angular/core'
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router'
import {Navbar} from '../../ui/navbar/navbar'
import {Footer} from 'src/app/shared/ui/footer/footer'
import {CartService} from '../../../shared/services/cart.service'
import {UserService} from 'src/app/shared/services/user.service'

@Component({
  selector: 'client-layout',
  templateUrl: './client-layout.html',
  standalone: true,
  styleUrls: ['../client.scss'],
  imports: [
    CommonModule,
    RouterOutlet,
    Navbar,
    NgFor,
    RouterLink,
    NgIf,
    RouterLinkActive,
    Footer,
  ],
})
export class ClientLayout implements OnInit {
  // navigation routes
  navigations: {url: string; name: string; icon: string; func?: () => void}[] =
    [
      {url: '/client/home', name: 'Nearby farms', icon: 'bi-geo-alt'},
      {url: '/client/orders', name: 'Orders', icon: 'bi-basket'},
      {url: '/client/cart', name: 'Cart', icon: 'bi-cart'},
      {url: '/client/notifications', name: 'Notifications', icon: 'bi-bell'},
      {url: '/public/login', name: 'Logout', icon: 'bi-person-slash'},
    ]

  isMenuOpen: boolean = false

  constructor(
    private cardService: CartService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.cardService.getCardFromStorage()
  }

  toggleMenu(name: string = 'toggle') {
    this.isMenuOpen = !this.isMenuOpen

    if (name === 'Logout') {
      this.userService.logoutFn()
    }
  }
}
