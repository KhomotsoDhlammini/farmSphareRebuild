import {Route} from '@angular/router'
import {FarmLayout} from './pages/layout/farmer-layout'
import {HomePage} from './pages/home/home'
import {OrdersPage} from './pages/orders/orders'
import {NotificationsPage} from './pages/notifications/notifications'
import { FarmDetailsPage } from './pages/farmDetails/farmDetails'
import { AddNewFarm } from './pages/addNewFarm/addNewFarm'
import { ViewOrderInfoPage } from './pages/view-order-info/checkout/viewOrderInfo'

export const farmerRoutes: Route[] = [
  {
    path: '',
    component: FarmLayout,
    children: [
      {
        path: 'home',
        component: HomePage,
      },
      {
        path: 'orders',
        component: OrdersPage,
      },
      {
        path: 'notifications',
        component: NotificationsPage,
      },
      {
        path: 'farmdetails/:id',
        component: FarmDetailsPage,
      },
      {
        path: 'addnewfarm',
        component: AddNewFarm,
      },
      {
        path: 'viewOrderInfo',
        component: ViewOrderInfoPage  }
    ],
  },
]
