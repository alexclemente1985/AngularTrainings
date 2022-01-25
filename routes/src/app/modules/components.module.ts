import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookComponent, DvdComponent, PageNotFoundComponent, DvdDetailComponent } from '../components';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [BookComponent,DvdComponent,PageNotFoundComponent, DvdDetailComponent],
  imports: [
    CommonModule, MaterialModule, AppRoutingModule
  ],
})
export class ComponentsModule { }
