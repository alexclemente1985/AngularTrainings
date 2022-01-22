import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../modules/material/material.module";
import {RxjsBasicComponent} from "./components"

@NgModule({
  declarations:[RxjsBasicComponent],
  imports:[CommonModule, MaterialModule, FormsModule],
  exports:[RxjsBasicComponent]
})
export class Secao7Module{}
