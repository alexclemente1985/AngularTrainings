import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./modules/material/material.module";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    
    
    HttpClientModule,
    MaterialModule,
    
    ReactiveFormsModule,
    
  ],
  exports: [
    CommonModule,
    
    
    HttpClientModule,
    MaterialModule,
    
    ReactiveFormsModule,
    
  ]
})
export class SharedModule { }
