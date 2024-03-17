import {Component, OnInit} from '@angular/core'
import {RouterOutlet} from '@angular/router'
import {Desktop} from './shared/ui/desktop/desktop'
import {CommonModule, NgIf} from '@angular/common'
import {UserService} from './shared/services/user.service'
import {NavigateService} from './shared/services/navigate.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    RouterOutlet,
     Desktop, 
     CommonModule, 
     NgIf,],
})
export class AppComponent implements OnInit {
  isMobile: boolean = window.innerWidth < 700 ? true : false

  constructor(
    private userService: UserService,
    private navigate: NavigateService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.userService.getUserFromStorageFn()
    } else {
      this.navigate.to('/public/login')
    }
  }
}
