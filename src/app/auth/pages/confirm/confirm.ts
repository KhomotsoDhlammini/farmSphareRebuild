import { CommonModule, NgIf } from '@angular/common';
import {Component} from '@angular/core'

@Component({
  selector: 'auth-confirm',
  templateUrl: './confirm.html',
  standalone: true,
  imports: [CommonModule, NgIf]
})
export class ConfirmPage {
  
}
