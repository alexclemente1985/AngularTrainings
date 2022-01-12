import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../modules/material/material.module";
import { PropertyBindingComponent, StringInterpolationComponent, EventBindingComponent, TwoWayDataBindingComponent } from "./components";

@NgModule({
  declarations:[
    PropertyBindingComponent,
    StringInterpolationComponent,
    EventBindingComponent,
    TwoWayDataBindingComponent
  ],
  imports:[CommonModule, MaterialModule, FormsModule],
  exports:[
    PropertyBindingComponent,
    StringInterpolationComponent,
    EventBindingComponent,
    TwoWayDataBindingComponent
  ]
})
export class Secao2Module{}
