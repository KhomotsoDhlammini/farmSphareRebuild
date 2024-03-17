import {CommonModule} from '@angular/common'
import {Component, OnInit} from '@angular/core'
import { AlertService } from 'src/app/shared/services/alert.service';
import { NavigateService } from 'src/app/shared/services/navigate.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { UserService } from 'src/app/shared/services/user.service';
import { OrderDetails } from 'src/app/shared/types/order.interface';


@Component({
  selector: 'farmer-orderPage',
  templateUrl: './orders.html',
  styleUrls: ['../farmer.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class OrdersPage implements OnInit {

  ordersList: OrderDetails[] = [];
  constructor(public orderService: OrderService, public userService: UserService, public alert: AlertService, public navigateService: NavigateService) {

  }

  ngOnInit(): void {
    const farmerId = this.userService.getUserSignal()?.id;
    this.orderService.getOrderListByFarmerId(farmerId + "").subscribe(
      (orderList: OrderDetails[]) => {

        console.log("orders List:"+orderList);
        this.ordersList = orderList;

        this.alert.success('Successfully fetched orders')
      },
      (error) => {
        console.log(error)
        this.alert.error('Error getting farmer orders')
      }
    );
  }
}