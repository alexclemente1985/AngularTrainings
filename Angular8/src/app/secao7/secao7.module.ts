import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../modules/material/material.module";
import {
  RxjsBasicComponent,
  RxjsColdObservablesComponent,
  RxjsHotObservablesIntroComponent,
  RxjsHotObservablesComponent,
  RxjsSubjectsComponent,
  SubjectChildComponent
} from "./components";

@NgModule({
  declarations:[
    RxjsBasicComponent,
    RxjsColdObservablesComponent,
    RxjsHotObservablesIntroComponent,
    RxjsHotObservablesComponent,
    RxjsSubjectsComponent,
    SubjectChildComponent
  ],
  imports:[CommonModule, MaterialModule, FormsModule],
  exports:[
    RxjsBasicComponent,
    RxjsColdObservablesComponent,
    RxjsHotObservablesIntroComponent,
    RxjsHotObservablesComponent,
    RxjsSubjectsComponent
  ]
})
export class Secao7Module{}
