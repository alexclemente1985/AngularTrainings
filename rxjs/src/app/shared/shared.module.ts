import { FormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule, MaterialModule, FormsModule
  ],
  exports: [
    MaterialModule,
    FormsModule
  ]
})
export class SharedModule { }
