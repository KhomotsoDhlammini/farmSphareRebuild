import { CommonModule } from '@angular/common';
import {Component} from '@angular/core'

@Component({
  selector: 'client-notificationsPage',
  templateUrl: './notifications.html',
  styleUrls: ['../client.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class NotificationsPage {}
