import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/modules';
import { HttpClientModule } from '@angular/common/http';
import { TemplateCardComponent } from 'src/app/components/template-card/template-card.component';
import { TemplatesModule } from './template-card/templates/';
import { TemplateFormComponent } from './template-form/template-form.component';
import { DialogEditProductComponent } from './dialog-edit-product/dialog-edit-product.component';


@NgModule({
  declarations: [
    TemplateCardComponent,
    TemplateFormComponent,
    DialogEditProductComponent,
  ],
  imports: [
    CommonModule, 
    FormsModule, 
    MaterialModule,
    HttpClientModule,
    TemplatesModule
  ],
  exports:[
    MaterialModule,
    TemplateCardComponent,
    TemplateFormComponent,
    DialogEditProductComponent,
  ]
})
export class ComponentsModule { }
