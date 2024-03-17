import {CommonModule} from '@angular/common'
import {ChangeDetectorRef, Component, OnInit} from '@angular/core'
import {FarmCard} from '../../ui/farmCard/farmCard'
import {FarmService} from 'src/app/shared/services/farm.service'
import {FarmInterface} from 'src/app/shared/types/farm.interface'

@Component({
  selector: 'client-homePage',
  templateUrl: './home.html',
  styleUrls: ['../client.scss'],
  standalone: true,
  imports: [CommonModule, FarmCard],
})
export class HomePage implements OnInit {
  farms: FarmInterface[] = []

  constructor(private farmService: FarmService, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    // this.getFarms()
   
  }

  getUserLocation() {
    this.farmService.getUserLocation().subscribe(
      
      (userCoordinates: any) => {
        console.log('User Coordinates:', userCoordinates);
        this.getFarms(userCoordinates);
      },
      (error: any) => {
        console.error('Error getting user location:', error);
      }
    );
  }

  getFarms(userCoordinates: any) {
    const radiusKm = 20;
    this.farmService.getFarmsWithinRadius(userCoordinates).subscribe(
        (filteredFarms: any) => {
            console.log('Filtered Farms (within 20km):', filteredFarms);
            // Update your UI to display the filtered farms
            this.farms = filteredFarms;
            this.changeDetectorRef.detectChanges();
        },
        (error: any) => {
            console.error('Error getting filtered farms:', error);
        }
    );
  }
}
