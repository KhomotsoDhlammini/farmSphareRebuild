import {CommonModule} from '@angular/common'
import {Component, Input} from '@angular/core'

@Component({
  selector: 'client-orderPage',
  templateUrl: './orders.html',
  styleUrls: ['../client.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class OrdersPage {
  @Input() orders: any[] = [

  ];
}
