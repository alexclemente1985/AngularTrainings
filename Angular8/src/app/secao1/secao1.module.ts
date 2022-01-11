import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MyfirstComponent, MySecondComponent, MyThirdComponent } from "./components";

@NgModule({
  declarations:[
    MyfirstComponent,
    MySecondComponent,
    MyThirdComponent
  ],
  imports:[CommonModule],
  exports:[
    MyfirstComponent,
    MySecondComponent,
    MyThirdComponent
  ]
})
export class Secao1Module{}
