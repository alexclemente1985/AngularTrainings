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
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule , ElectronicsModule, ElectronicsRoutingModule} from '.';

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
    ReactiveFormsModule,
  ],
})
export class ComponentsModule { }
