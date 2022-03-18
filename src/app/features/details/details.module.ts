import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { DetailsRoutingModule } from './details-routing.module';
import { DetailsComponent } from './details.component';

@NgModule({
  imports: [DetailsRoutingModule, NativeScriptCommonModule],
  declarations:[
    DetailsComponent
  ],
  exports:[DetailsComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class DetailsModule{}
