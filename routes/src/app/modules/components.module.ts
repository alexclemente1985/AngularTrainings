import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BookComponent,
  DvdComponent,
  PageNotFoundComponent,
  DvdDetailComponent,
  DvdFormComponent,
  BookDetailComponent,
  BookAuthorsComponent
} from '../components';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BookComponent,
    BookDetailComponent,
    BookAuthorsComponent,
    DvdComponent,
    DvdDetailComponent,
    DvdFormComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
})
export class ComponentsModule { }
