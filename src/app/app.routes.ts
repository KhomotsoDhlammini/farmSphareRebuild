import {Route} from '@angular/router'

export const appRoutes: Route[] = [
  {
    path: 'public',
    loadChildren: () =>
      import('src/app/auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: 'client',
    loadChildren: () =>
      import('src/app/client/client.routes').then((m) => m.clientRoutes),
  },
  {
    path: 'farmer',
    loadChildren: () =>
      import('./farmer/farmer.routes').then((m) => m.farmerRoutes),
  },
  {
    path: '',
    redirectTo: 'public/login',
    pathMatch: 'full',
  }
]
