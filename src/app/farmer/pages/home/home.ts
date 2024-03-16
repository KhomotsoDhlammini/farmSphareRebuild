import { NgFor } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FarmCard } from 'src/app/farmer/ui/farmCard/farmCard'
import { FarmService } from 'src/app/shared/services/farm.service'
import { NavigateService } from 'src/app/shared/services/navigate.service'
import { UserService } from 'src/app/shared/services/user.service'
import { FarmInterface } from 'src/app/shared/types/farm.interface'

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
    private userService: UserService,
    private navigate: NavigateService
  ) { }

  ngOnInit(): void {
    this.getFarmerFarms()
    this.navigateToAdd

  }

  navigateToAdd() {
    this.navigate.to('/farmer/addnewfarm')
  }

  getFarmerFarms() {
    this.farmerService
      .getFarmerFarms(this.userService.getUserSignal()?.id)
      .subscribe((res) => {
        this.farms = res
      })
  }
}
