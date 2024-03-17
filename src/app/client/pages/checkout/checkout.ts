import { Component } from '@angular/core';
import { NavigateService } from 'src/app/shared/services/navigate.service';
import { UserService } from 'src/app/shared/services/user.service';
import { BackButton } from 'src/app/shared/ui/backButton';
import { CartService } from '../../../shared/services/cart.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'client-checkoutPage',
    templateUrl: './checkout.html',
    standalone: true,
    imports: [BackButton, DatePipe]
})
export class CheckoutPage {

    constructor(public navigate: NavigateService, public userService: UserService, public cartService: CartService) {}

    getDate() {
        return Date.now()
    }

}