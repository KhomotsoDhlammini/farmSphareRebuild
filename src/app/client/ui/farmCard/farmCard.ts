import {CommonModule} from '@angular/common'
import {Component, Input} from '@angular/core'
import {NavigateService} from 'src/app/shared/services/navigate.service'
import { FarmInterface } from 'src/app/shared/types/farm.interface'

@Component({
  selector: 'client-farmCard',
  templateUrl: './farmCard.html',
  styleUrls: ['../client-ui.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class FarmCard {

  @Input() farm!: FarmInterface

  constructor(public navigate: NavigateService) {}


  goTo() {
    this.navigate.to(`/client/farmdetails/${this.farm.farmID}`)
  }
}
