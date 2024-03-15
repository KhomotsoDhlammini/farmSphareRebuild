import {Injectable, inject} from '@angular/core'
import {Router} from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class NavigateService {
  router = inject(Router)

  to(url: string): void {
    this.router.navigate([url])
  }
}
