import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  standalone: true,
  imports: [NgIf],
})
export class SpinnerComponent implements OnInit {

  constructor(public spinnerService: SpinnerService) {    
  }

  ngOnInit(): void {
     // Subscribe to the counter observable
    this.spinnerService.isLoading$.subscribe(
      value => {
        this.isLoading = value; // Update the counter value
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  isLoading : boolean = false;
}
