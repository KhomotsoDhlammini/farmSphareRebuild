import { NgFor } from '@angular/common'
import {Component, OnInit} from '@angular/core'
import {FarmCard} from 'src/app/farmer/ui/farmCard/farmCard'
import {FarmService} from 'src/app/shared/services/farm.service'
import {UserService} from 'src/app/shared/services/user.service'
import {FarmInterface} from 'src/app/shared/types/farm.interface'

@Component({
  selector: 'farmer-homePage',
  templateUrl: './home.html',
  standalone: true,
  imports: [FarmCard, NgFor],
})
export class HomePage implements OnInit {
  farms: FarmInterface[] = []

  constructor(
    private farmerService: FarmService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getFarmerFarms() 
  }

  getFarmerFarms() {
    this.farmerService
      .getFarmerFarms(this.userService.getUserSignal()?.id)
      .subscribe((res) => {
        this.farms = res
      })
  }
}
