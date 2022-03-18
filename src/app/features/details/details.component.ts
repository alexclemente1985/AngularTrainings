import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core'
import { FlickModel } from '~/app/core/models/flick.model';
import { FlickService } from '~/app/services/flick.service';

@Component({
  moduleId: module.id,
  selector: 'ns-details',
  templateUrl: 'details.component.html'
})
export class DetailsComponent {
  flick: FlickModel | undefined = undefined

  // Add this 👇
  constructor(
    private activatedRoute: ActivatedRoute,
    private flickService: FlickService
  ) {}

  // Add this 👇
  ngOnInit(): void {
    const id = +this.activatedRoute.snapshot.params.id
    if (id) {
      this.flick = this.flickService.getFlickById(id)
    }
  }
}
