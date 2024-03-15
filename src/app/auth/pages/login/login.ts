import {Component, OnInit} from '@angular/core'
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms'
import {RouterLink} from '@angular/router'
import {NavigateService} from 'src/app/shared/services/navigate.service'
import {AuthService} from '../../auth.service'
import {UserService} from 'src/app/shared/services/user.service'
import {AlertService} from 'src/app/shared/services/alert.service'

@Component({
  selector: 'auth-login',
  templateUrl: './login.html',
  styleUrls: ['../auth.styles.scss'],
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
})
export class LoginPage implements OnInit {
  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private navigate: NavigateService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    localStorage.removeItem('cart')
  }

  onSubmit() {
    this.authService.onLoginFn(this.form.getRawValue()).subscribe(
      (res) => {
        const {id, username, role, phoneNumber, userImageURL, token} = res
        localStorage.setItem('token', token)
        this.userService.setUserSignal({
          id,
          username,
          role,
          phoneNumber,
          userImageURL,
        })

        this.userService.saveUserToStorageFn()

        this.alert.success(`Welcome ${username}`)

        if (res.role === 'CONSUMER') {
          this.navigate.to('/client/home')
          return
        }

        if (res.role === 'FARMER') {
          this.navigate.to('/farmer/home')
          return
        }
      },
      (error) => {
        this.alert.error(`Please try again later`)
      }
    )
  }
}
