import { RouterExtensions } from '@nativescript/angular';
import { Component } from '@angular/core'
import { ItemEventData } from '@nativescript/core';
import { FlickService } from '../../services/flick.service'


@Component({
  moduleId: module.id,
  selector: 'ns-home',
  templateUrl: 'home.component.html'
})
export class HomeComponent {
  flicks = this.flickService.getFlicks()

  constructor(
    // Add this 👇
    private flickService: FlickService,
    private routerExtensions: RouterExtensions
  ) {}

  onFlickTap(args: ItemEventData): void {
    this.routerExtensions.navigate(['details', this.flicks[args.index].id])
  }
}
