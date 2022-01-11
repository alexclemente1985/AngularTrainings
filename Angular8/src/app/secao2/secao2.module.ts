import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "../modules/material/material.module";
import { PropertyBindingComponent, StringInterpolationComponent } from "./components";

@NgModule({
  declarations:[
    PropertyBindingComponent,
    StringInterpolationComponent
  ],
  imports:[CommonModule, MaterialModule],
  exports:[
    PropertyBindingComponent,
    StringInterpolationComponent
  ]
})
export class Secao2Module{}
