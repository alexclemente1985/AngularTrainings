import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentFormComponent, ProductFormComponent, ProductsTableComponent } from 'src/app/components';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [DepartmentFormComponent, ProductFormComponent, ProductsTableComponent],
  imports: [
    CommonModule, MaterialModule, FormsModule
  ],
  exports: [DepartmentFormComponent, ProductFormComponent, ProductsTableComponent]
})
export class ComponentsModule { }
