import { Component, Input } from "@angular/core";
import { UploadWidgetModule } from "@bytescale/upload-widget-angular";
import { ModalOptions, initFlowbite } from 'flowbite';
import { CommonModule } from "@angular/common";
import { UserService } from "src/app/shared/services/user.service";
import { Modal } from 'flowbite';
import { UploadWidgetConfig, UploadWidgetResult } from "@bytescale/upload-widget";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { ProductService } from "src/app/shared/services/product.service";
import { AlertService } from "src/app/shared/services/alert.service";
import { NavigateService } from "src/app/shared/services/navigate.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'addNewProduct',
  templateUrl: './addNewProduct.html',
  styleUrls: ['./addNewProduct.scss'],
  standalone: true,
  imports: [UploadWidgetModule, ReactiveFormsModule, CommonModule],
})

export class AddProductPage {
  placeholderImage = "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";
  form = this.fb.nonNullable.group({
    farmID: ['', Validators.required], // we need to get from login info
    productName: ['', Validators.required],
    productPrice: ['', Validators.required],
    productImageURL: ['', Validators.required],
    productDescription: ['', Validators.required]
  })

  farmOptions: UploadWidgetConfig = {
    apiKey: 'free', // Get API keys from: www.bytescale.com
    multi: false
  };
  productImageOnComplete = (files: UploadWidgetResult[]) => {
    this.form.controls.productImageURL.setValue(files[0]?.fileUrl);
  };

  constructor(private fb: FormBuilder,
    public userService: UserService,
    private alert: AlertService,
    public navigate: NavigateService,
    private router: ActivatedRoute,
    private productService: ProductService) {
  }

  ngOnInit(): void {
    initFlowbite();
  }

  onAddNewProductPopup() {
    const modal = this.getModalRef();
    modal.show();
  }

  closeModalPopup() {
    const modal = this.getModalRef();
    modal.hide();
  }

  getModalRef(): Modal {
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
    return new Modal($targetEl, options, instanceOptions);
  }

  onSubmit() {

    this.form.controls.farmID.setValue(this.router.snapshot.paramMap.get('id') as string);
    console.log(this.form.getRawValue())
    if (this.form.valid) {
      const formData = this.form.getRawValue();
      this.productService.addProduct(formData).subscribe(
        (response) => {
          // Handle success, maybe show a success message or redirect to another page
          this.alert.success('Succefully added a product');
          this.closeModalPopup();
          this.form.reset();
           window.location.reload();
          //this.navigate.to(`/farmer/farmdetails/${response.farmID}`)        
        },
        (error) => {
          this.alert.error('Error adding product')
        }
      );
    } else {
      this.alert.error("Please input all details");
    }
  }
}