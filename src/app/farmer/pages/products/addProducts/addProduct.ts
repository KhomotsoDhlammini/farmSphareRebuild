import { Component } from "@angular/core";
import { NavigateService } from "src/app/shared/services/navigate.service";
import { UploadWidgetModule } from "@bytescale/upload-widget-angular";

@Component({
    selector: 'addNewProduct',
    templateUrl: './addNewProduct.html',
    styleUrls: ['./addNewProduct.scss'],
    standalone: true,
    imports: [UploadWidgetModule],
  })
  
export class AddProductPage {
    /**
     *
     */
    constructor(private navigate: NavigateService) {        
    }
}