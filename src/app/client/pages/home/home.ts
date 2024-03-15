import {CommonModule} from '@angular/common'
import {Component, OnInit} from '@angular/core'
import {FilterFarms} from '../../ui/filterFarms/filterFarms'
import {FarmCard} from '../../ui/farmCard/farmCard'
import {FarmService} from 'src/app/shared/services/farm.service'
import {FarmInterface} from 'src/app/shared/types/farm.interface'

@Component({
  selector: 'client-homePage',
  templateUrl: './home.html',
  styleUrls: ['../client.scss'],
  standalone: true,
  imports: [CommonModule, FilterFarms, FarmCard],
})
export class HomePage implements OnInit {
  farms: FarmInterface[] = []

  constructor(private farmService: FarmService) {}

  ngOnInit(): void {
    this.getFarms()
  }

  getFarms() {
    this.farmService.getFarmsFn().subscribe(
      (res) => {
        this.farms = res
      },
      (error) => console.log(error)
    )
  }
}
