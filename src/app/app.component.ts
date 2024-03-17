import {Component, OnInit} from '@angular/core'
import {RouterOutlet} from '@angular/router'
import {Desktop} from './shared/ui/desktop/desktop'
import {CommonModule, NgIf} from '@angular/common'
import {UserService} from './shared/services/user.service'
import {NavigateService} from './shared/services/navigate.service'
import { SpinnerComponent } from './shared/ui/spinner/spinner.component'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    RouterOutlet,
     Desktop, 
     CommonModule, 
     NgIf,
     SpinnerComponent
    ],
})
export class AppComponent implements OnInit {
  isMobile: boolean = window.innerWidth < 700 ? true : false
  isLoading: boolean = true;

  constructor(
    private userService: UserService,
    private navigate: NavigateService
  ) {
   
  }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.userService.getUserFromStorageFn()
    } else {
      this.navigate.to('/public/login')
    }
  }

  spinnerLoading() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 8000);
  }}
