

import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { SignInComponent } from "./sign-in/sign-in.component";
import { TasksComponent } from "./tasks/tasks.component";

export const routes: Routes = [
  {
    path: "",
    component: SignInComponent
  },
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)]
})
export class PagesRoutingModule {}
