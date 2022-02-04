import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  FormNativeValidationComponent, 
  TemplateDrivenFormComponent, 
  FormValidationComponent, 
  FormControlComponent, 
  FormGroupComponent, 
  FormBuilderComponent, 
  FormArrayComponent,
  ReactiveFormValidationComponent 
} from 'src/app/components';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TemplateDrivenFormComponent, 
    FormNativeValidationComponent, 
    FormValidationComponent, 
    FormControlComponent,
    FormGroupComponent,
    FormBuilderComponent,
    FormArrayComponent,
    ReactiveFormValidationComponent
  ],
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    MaterialModule
  ],
  exports: [
    TemplateDrivenFormComponent, 
    FormNativeValidationComponent, 
    FormValidationComponent, 
    FormControlComponent,
    FormGroupComponent,
    FormBuilderComponent,
    FormArrayComponent,
    ReactiveFormValidationComponent
  ]
})
export class ComponentsModule { }
