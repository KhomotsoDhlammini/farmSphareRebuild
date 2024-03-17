import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FarmCard } from '../../ui/farmCard/farmCard';
import { FarmService } from 'src/app/shared/services/farm.service';
import { FarmInterface } from 'src/app/shared/types/farm.interface';
import { SpinnerComponent } from 'src/app/shared/ui/spinner/spinner.component';

@Component({
  selector: 'client-homePage',
  templateUrl: './home.html',
  styleUrls: ['../client.scss'],
  standalone: true,
  imports: [CommonModule, FarmCard, SpinnerComponent],
})
export class HomePage implements OnInit {
  farms: FarmInterface[] = [];
  isLoading: boolean = false;

  constructor(
    private farmService: FarmService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.getUserLocation();
  }

  getUserLocation() {
    this.farmService.getUserLocation().subscribe(
      (userCoordinates: any) => {
        this.isLoading = true;
        console.log('User Coordinates:', userCoordinates);
        this.getFarms(userCoordinates);
      },
      (error: any) => {
        console.error('Error getting user location:', error);
        this.isLoading = false; // Set isLoading to false on error
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
        console.error('Error getting filtered farms:', error);
      }
    ).add(() => {
      this.isLoading = false; // Set isLoading to false after the request completes (success or error)
      this.changeDetectorRef.detectChanges();
    });
  }
}
