import {Route} from '@angular/router'
import {LoginPage} from './pages/login/login'
import {RegisterPage} from './pages/register/register'
import {ConfirmPage} from './pages/confirm/confirm'

export const authRoutes: Route[] = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginPage,
      },
      {
        path: 'register',
        component: RegisterPage,
      },
      {
        path: 'confirm',
        component: ConfirmPage,
      },
    ],
  },
]
