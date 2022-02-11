import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PeopleComponent } from "src/app/components/people/people.component";
import { AuthRoutingModule } from "../auth/auth-routing.module";

const routes: Routes = [
  { path: '', redirectTo: 'people'},
  { path: 'people', component: PeopleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule{}
