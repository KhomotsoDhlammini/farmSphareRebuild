import { CommonModule } from '@angular/common';
import {Component} from '@angular/core'

@Component({
  selector: 'farmer-notificationsPage',
  templateUrl: './notifications.html',
  styleUrls: ['../farmer.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class NotificationsPage {}
