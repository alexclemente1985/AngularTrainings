import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentFormComponent, ProductFormComponent, ProductsTableComponent } from 'src/app/components';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [DepartmentFormComponent, ProductFormComponent, ProductsTableComponent],
  imports: [
    CommonModule, MaterialModule
  ],
  exports: [DepartmentFormComponent, ProductFormComponent, ProductsTableComponent]
})
export class ComponentsModule { }
