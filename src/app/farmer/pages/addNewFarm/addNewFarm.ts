import { Component } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { NavigateService } from "src/app/shared/services/navigate.service";
import { UserService } from "src/app/shared/services/user.service";
import { UploadWidgetModule } from "@bytescale/upload-widget-angular";
import { UploadWidgetConfig, UploadWidgetResult } from "@bytescale/upload-widget";
import { FarmService } from "src/app/shared/services/farm.service";
import { AlertService } from "src/app/shared/services/alert.service";

@Component({
  selector: 'farmer-addNewFarm',
  templateUrl: './addNewFarm.html',
  styleUrls: ['./addNewFarm.scss'],
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, UploadWidgetModule],
})

export class AddNewFarm {
  placeholderImage = "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";

  form = this.fb.nonNullable.group({
    farmerID: [this.userService.getUserSignal()?.id, Validators.required], // we need to get from login info
    farmName: ['', Validators.required],
    farmLocation: ['', Validators.required],
    farmImageURL: ['', Validators.required],
    farmDescription: ['', Validators.required]
  })

  farmOptions: UploadWidgetConfig = {
    apiKey: 'free', // Get API keys from: www.bytescale.com
    multi: false
  };

  farmOnComplete = (files: UploadWidgetResult[]) => {
    this.form.controls.farmImageURL.setValue(files[0]?.fileUrl);
  };

  /**
   *
   */
  constructor(private fb: FormBuilder, public userService: UserService,
    private farmService: FarmService,
    public navigate: NavigateService,
    private alert: AlertService) {
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.getRawValue();
      this.farmService.createFarm(formData).subscribe(
        (response) => {
          // Handle success, maybe show a success message or redirect to another page
          console.log('Farm created successfully:', response);
          this.alert.success('Succefully added a farm');
          this.navigate.to(`/farmer/farmdetails/${response.farmID}`)        
        },
        (error) => {
          this.alert.error('Error creating a farm')
        }
      );
    } else {
      this.alert.error("Please input all details");
    }
  }

}