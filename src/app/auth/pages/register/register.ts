import {Component} from '@angular/core'
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms'
import {RouterLink} from '@angular/router'
import {AuthService} from '../../auth.service'
import {UserService} from 'src/app/shared/services/user.service'
import {NavigateService} from 'src/app/shared/services/navigate.service'
import {AlertService} from 'src/app/shared/services/alert.service'

@Component({
  selector: 'auth-register',
  templateUrl: './register.html',
  styleUrls: ['../auth.styles.scss'],
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
})
export class RegisterPage {
  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    role: ['CONSUMER', Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private navigate: NavigateService,
    private alert: AlertService
  ) {}

  onSubmit() {
    this.authService.onRegisterFn(this.form.getRawValue()).subscribe(
      (res) => {
        const {authenticationId, username, role, phoneNumber, userImageURL, token} = res
        localStorage.setItem('token', token)
        this.userService.setUserSignal({
          id: authenticationId,
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
