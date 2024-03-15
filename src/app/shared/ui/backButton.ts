import {Component, inject} from '@angular/core'
import {Location} from '@angular/common'

@Component({
  standalone: true,
  selector: 'shared-back-button',
  styles: [
    `
      #back {
        animation-name: backAnimation;
        animation-duration: 1s;
      }

      @keyframes backAnimation {
        from {
          margin-left: -100%;
          opacity: 0;
        }
        to {
          margin-left: 0;
          opacity: 1;
        }
      }
    `,
  ],
  template: `
    <button
      id="back"
      class="bg-green-100 w-16 shadow-md text-2xl"
      (click)="back()"
    >
      <i class="bi bi-arrow-left"></i>
    </button>
  `,
})
export class BackButton {
  location = inject(Location)

  back(): void {
    this.location.back()
  }
}
