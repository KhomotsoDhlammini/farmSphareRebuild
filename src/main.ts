import {bootstrapApplication} from '@angular/platform-browser'
import {AppComponent} from './app/app.component'
import {provideRouter} from '@angular/router'
import {appRoutes} from './app/app.routes'
import {provideHttpClient, withInterceptors} from '@angular/common/http'
import {authInterceptor} from './app/shared/utilities/auth.interceptor'
import {provideAnimations} from '@angular/platform-browser/animations'
import {provideToastr} from 'ngx-toastr'

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimations(), // required animations providers
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressAnimation: 'increasing',
      progressBar: true,
    }), // Toastr providers
  ],
})
