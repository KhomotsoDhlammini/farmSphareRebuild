import { Component, OnInit } from '@angular/core';
import { NavigateService } from 'src/app/shared/services/navigate.service';
import { UserService } from 'src/app/shared/services/user.service';
import { BackButton } from 'src/app/shared/ui/backButton';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/shared/services/order.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { OrderDetails, OrderProduct } from 'src/app/shared/types/order.interface';
import { UserInterface } from 'src/app/shared/types/user.interface';

@Component({
    selector: 'farmer-viewOrderInfoPage',
    templateUrl: './viewOrderInfo.html',
    standalone: true,
    imports: [BackButton, DatePipe, CommonModule]
})
export class ViewOrderInfoPage implements OnInit {

    public orderId: string = '';
    public orderDetails: OrderDetails = {} as OrderDetails;
    public userInterface: UserInterface = {} as UserInterface;
    public productsList: Array<OrderProduct> = [];

    constructor(public navigate: NavigateService, public userService: UserService,
        private router: ActivatedRoute, public orderService: OrderService, private alert: AlertService,) { }

    ngOnInit(): void {
        this.orderId = this.router.snapshot.paramMap.get('orderId') as string;

        // make a request to get order        
        this.orderService.getOrderById(this.orderId).subscribe(
            (orderDetails: OrderDetails) => {
                console.log(orderDetails);
                this.orderDetails = orderDetails;

                // make request to get OrderProducts list
                this.getAllOrderProductsByOrderId(this.orderDetails.orderID);

                // make a request to get consumer details 
                this.getUserDetail(this.orderDetails.consumerID)
            },
            (error) => {
                console.log(error)
                this.alert.error('Error getting an order');
            }
        );
    }

    onDeclineOrder() {
        this.orderService.updateOrderStatus({ orderID: +this.orderId, orderStatus: "Declined"}).subscribe(
            (response) => {
                this.orderDetails.orderStatus = "Declined";
            },
            (error) => {
                console.log(error)
                this.alert.error('Error updating status');
            }
        );
    }

    onAcceptOrder() {
        this.orderService.updateOrderStatus({ orderID: +this.orderId, orderStatus: "Accepted"}).subscribe(
            (response) => {
                this.orderDetails.orderStatus = "Accepted";
            },
            (error) => {
                console.log(error)
                this.alert.error('Error updating status');
            }
        );
    }

    getUserDetail(userId: number) {
        this.userService.getUserById(userId).subscribe(
            (userInterface: UserInterface) => {
                console.log(userInterface);
                this.userInterface = userInterface;
            },
            (error) => {
                console.log(error)
                this.alert.error('Error getting a user');
            }
        );
    }

    getAllOrderProductsByOrderId(orderId: number) {
        this.orderService.getAllOrderProductsByOrderId(orderId).subscribe(
            (productsList: Array<OrderProduct>) => {
                console.log(productsList);
                this.productsList = productsList;
            },
            (error) => {
                console.log(error)
                this.alert.error('Error getting a user');
            }
        );
    }
}