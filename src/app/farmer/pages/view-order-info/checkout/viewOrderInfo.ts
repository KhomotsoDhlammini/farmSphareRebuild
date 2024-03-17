import { Component, OnInit } from '@angular/core';
import { NavigateService } from 'src/app/shared/services/navigate.service';
import { UserService } from 'src/app/shared/services/user.service';
import { BackButton } from 'src/app/shared/ui/backButton';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/shared/services/order.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { OrderDetails } from 'src/app/shared/types/order.interface';

@Component({
    selector: 'client-viewOrderInfoPage',
    templateUrl: './viewOrderInfo.html',
    standalone: true,
    imports: [BackButton, DatePipe, CommonModule]
})
export class ViewOrderInfoPage  {

   

}