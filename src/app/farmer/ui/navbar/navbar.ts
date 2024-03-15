import {CommonModule} from '@angular/common'
import {Component, EventEmitter, Output} from '@angular/core'
import { NavigateService } from 'src/app/shared/services/navigate.service'

@Component({
  selector: 'farmer-navbar',
  templateUrl: './navbar.html',
  standalone: true,
  imports: [CommonModule],
})
export class Navbar {
  @Output() toggle = new EventEmitter()

  constructor(public navigate: NavigateService){}

  toggleMenu() {
    this.toggle.emit()
  }
}
