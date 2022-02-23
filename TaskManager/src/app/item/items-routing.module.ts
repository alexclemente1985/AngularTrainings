

import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { ItemsComponent } from "./items.component";

export const routes: Routes = [
  {
    path: "",
    component: ItemsComponent
  }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)]
})
export class ItemsRoutingModule {}
