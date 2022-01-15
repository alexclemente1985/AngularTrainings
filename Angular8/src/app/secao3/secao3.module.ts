import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../modules/material/material.module";
import { NgStyleComponent } from "./components";
import { NgClassComponent } from './components/ng-class/ng-class.component';

@NgModule({
  declarations:[
    NgStyleComponent,
    NgClassComponent
  ],
  imports:[CommonModule, MaterialModule, FormsModule],
  exports:[
    NgStyleComponent
  ]
})
export class Secao3Module{}
