import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "src/app/components/login/login.component";
import { RegisterComponent } from "src/app/components/register/register.component";
import { MaterialModule } from "../material/material.module"

const routes: Routes = [
  {path: 'auth/login', component: LoginComponent},
  {path: 'auth/register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, MaterialModule]
})
export class AuthRoutingModule{}
