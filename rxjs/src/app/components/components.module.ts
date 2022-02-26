import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicCreationComponent } from './basic-creation/basic-creation.component';


@NgModule({
  declarations: [
    BasicCreationComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[
    BasicCreationComponent
  ]
})
export class ComponentsModule { }
