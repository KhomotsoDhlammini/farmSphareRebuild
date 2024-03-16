import { Component } from "@angular/core";
import { NavigateService } from "src/app/shared/services/navigate.service";

@Component({
    selector: 'farmer-addNewFarm',
    templateUrl: './addNewFarm.html',
    styleUrls: ['./addNewFarm.scss'],
    standalone: true,
    imports: [],
  })
  
export class AddNewFarm {
    /**
     *
     */
    constructor( private navigate: NavigateService) {

        
        
    }
}