import { Component } from "@angular/core";
import { NavigateService } from "src/app/shared/services/navigate.service";
import { UploadWidgetModule } from "@bytescale/upload-widget-angular";

import { ModalOptions, initFlowbite } from 'flowbite';
import { CommonModule } from "@angular/common";
import { UserService } from "src/app/shared/services/user.service";
import { Modal } from 'flowbite';


@Component({
  selector: 'addNewProduct',
  templateUrl: './addNewProduct.html',
  styleUrls: ['./addNewProduct.scss'],
  standalone: true,
  imports: [UploadWidgetModule, CommonModule],
})

export class AddProductPage {
  /**
   *
   */
  constructor(private navigate: NavigateService, public userService: UserService,) {
  }

  ngOnInit(): void {
    initFlowbite();
  }


  onAddNewProductPopup() {
    const $targetEl = document.getElementById('add-product-popup-modal');

    // options with default values
    const options = {
      backdrop: 'dynamic',
      backdropClasses:
        'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
      closable: true,
    } as ModalOptions;

    // instance options object
    const instanceOptions = {
      id: 'add-product-popup-modal',
      override: true
    };
    const modal = new Modal($targetEl, options, instanceOptions);
    modal.show();
  }
}