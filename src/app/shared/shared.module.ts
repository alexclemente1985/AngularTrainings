import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./modules/material/material.module";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    MaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
