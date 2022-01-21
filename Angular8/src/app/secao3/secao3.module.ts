import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../modules/material/material.module";
import {
  NgStyleComponent,
  NgClassComponent,
  NgIfComponent,
  NgForComponent,
  NgSwitchComponent,
  NgTemplateComponent,
  NgContainerComponent,
  NgContentComponent
} from "./components";

@NgModule({
  declarations:[
    NgStyleComponent,
    NgClassComponent,
    NgIfComponent,
    NgForComponent,
    NgSwitchComponent,
    NgTemplateComponent,
    NgContainerComponent,
    NgContentComponent
  ],
  imports:[CommonModule, MaterialModule, FormsModule],
  exports:[
    NgStyleComponent,
    NgClassComponent,
    NgIfComponent,
    NgForComponent,
    NgSwitchComponent,
    NgTemplateComponent,
    NgContainerComponent,
    NgContentComponent
  ]
})
export class Secao3Module{}
