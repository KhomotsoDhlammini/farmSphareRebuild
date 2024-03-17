import { Component, OnInit } from '@angular/core';
import { NavigateService } from 'src/app/shared/services/navigate.service';
import { UserService } from 'src/app/shared/services/user.service';
import { BackButton } from 'src/app/shared/ui/backButton';
import { CartService } from '../../../shared/services/cart.service';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/shared/services/order.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { OrderDetails } from 'src/app/shared/types/order.interface';

@Component({
    selector: 'client-checkoutPage',
    templateUrl: './checkout.html',
    standalone: true,
    imports: [BackButton, DatePipe, CommonModule]
})
export class CheckoutPage implements OnInit {

    public orderId: string = '';
    public orderDetails: OrderDetails = {} as OrderDetails;

    constructor(public navigate: NavigateService, public userService: UserService, public cartService: CartService,
        private router: ActivatedRoute, public orderService: OrderService, private alert: AlertService,) { }

    ngOnInit(): void {
        this.orderId = this.router.snapshot.paramMap.get('orderId') as string;

        // make a request to get order
        this.orderService.getOrderById(this.orderId).subscribe(
            (orderDetails: OrderDetails) => {
                console.log(orderDetails);
                this.orderDetails = orderDetails;
            },
            (error) => {
                console.log(error)
                this.alert.error('Error getting an order');
            }
        );
    }

    getDate() {
        return Date.now()
    }

}