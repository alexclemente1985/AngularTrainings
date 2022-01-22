import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../modules/material/material.module";
import {RxjsBasicComponent, RxjsColdObservablesComponent, RxjsHotObservablesIntroComponent} from "./components";

@NgModule({
  declarations:[
    RxjsBasicComponent,
    RxjsColdObservablesComponent,
    RxjsHotObservablesIntroComponent
  ],
  imports:[CommonModule, MaterialModule, FormsModule],
  exports:[RxjsBasicComponent, RxjsColdObservablesComponent, RxjsHotObservablesIntroComponent]
})
export class Secao7Module{}
