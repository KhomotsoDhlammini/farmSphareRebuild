import {CommonModule} from '@angular/common'
import {Component} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {FarmService} from 'src/app/shared/services/farm.service'
import {FarmInterface} from 'src/app/shared/types/farm.interface'
import {Slider} from 'src/app/shared/ui/slider/slider'

@Component({
  selector: 'client-farmDetailsPage',
  templateUrl: './farmDetails.html',
  styleUrls: ['../client.scss'],
  standalone: true,
  imports: [CommonModule, Slider],
})
export class FarmDetailsPage {
  farm!: FarmInterface
  farmID!: string

  constructor(
    private farmService: FarmService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getFarms()
  }

  getFarms() {
    this.farmID = this.router.snapshot.paramMap.get('id') as string

    this.farmService.getSingleFarmDetailFn(this.farmID).subscribe(
      (res) => {
        this.farm = res
      },
      (error) => console.log(error)
    )
  }
}
