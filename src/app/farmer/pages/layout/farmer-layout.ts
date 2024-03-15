import {CommonModule, NgFor, NgIf} from '@angular/common'
import {Component, OnInit} from '@angular/core'
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router'
import {Footer} from 'src/app/shared/ui/footer/footer'
import {UserService} from 'src/app/shared/services/user.service'
import {Navbar} from 'src/app/farmer/ui/navbar/navbar'

@Component({
  selector: 'client-layout',
  templateUrl: './farmer-layout.html',
  standalone: true,
  styleUrls: ['../farmer.scss'],
  imports: [
    CommonModule,
    RouterOutlet,
    NgFor,
    RouterLink,
    NgIf,
    RouterLinkActive,
    Footer,
    Navbar,
  ],
})
export class FarmLayout implements OnInit {

  // navigation routes
  navigations: {url: string; name: string; icon: string}[] = [
    {url: '/farmer/home', name: 'Farms', icon: 'bi-geo-alt'},
    {url: '/farmer/orders', name: 'Orders', icon: 'bi-basket'},
    {url: '/farmer/notifications', name: 'Notifications', icon: 'bi-bell'},
    {url: '/public/login', name: 'Logout', icon: 'bi-person-slash'},
  ]

  isMenuOpen: boolean = false

  constructor(public userService: UserService) {}

  ngOnInit(): void {}

  toggleMenu(name: string = 'toggle') {
    this.isMenuOpen = !this.isMenuOpen

    if (name === 'Logout') {
      this.userService.logoutFn()
    }
  }
}
