import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleComponent, ProductsComponent } from 'src/app/components';



@NgModule({
  declarations: [ProductsComponent, PeopleComponent],
  imports: [
    CommonModule
  ],
})
export class ComponentsModule { 
  
}
