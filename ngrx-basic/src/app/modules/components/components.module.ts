import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonComponent } from 'src/app/components';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [PersonComponent],
  imports: [
    CommonModule, MaterialModule
  ],
  exports:[PersonComponent]
})
export class ComponentsModule { }
