import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FarmCard } from '../../ui/farmCard/farmCard';
import { FarmService } from 'src/app/shared/services/farm.service';
import { FarmInterface } from 'src/app/shared/types/farm.interface';
import { SpinnerComponent } from 'src/app/shared/ui/spinner/spinner.component';
import { SpinnerService } from 'src/app/shared/services/spinner.service';

@Component({
  selector: 'client-homePage',
  templateUrl: './home.html',
  styleUrls: ['../client.scss'],
  standalone: true,
  imports: [CommonModule, FarmCard, SpinnerComponent],
})
export class HomePage implements OnInit {
  farms: FarmInterface[] = [];

  constructor(
    private spinnerService: SpinnerService,
    private farmService: FarmService,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.getUserLocation();
  }

  getUserLocation() {
    this.spinnerService.start();
    this.farmService.getUserLocation().subscribe(
      (userCoordinates: any) => {
        this.spinnerService.start();
        console.log('User Coordinates:', userCoordinates);
        this.getFarms(userCoordinates);
      },
      (error: any) => {
        this.spinnerService.stop();
        console.error('Error getting user location:', error);
      }
    );
  }

  getFarms(userCoordinates: any) {
    const radiusKm = 20;
    this.farmService.getFarmsWithinRadius(userCoordinates).subscribe(
      (filteredFarms: any) => {
        console.log('Filtered Farms (within 20km):', filteredFarms);
        this.farms = filteredFarms;
      },
      (error: any) => {
        this.spinnerService.stop();
        console.error('Error getting filtered farms:', error);
      }
    ).add(() => {
      this.spinnerService.stop();
      this.changeDetectorRef.detectChanges();
    });
  }
}
