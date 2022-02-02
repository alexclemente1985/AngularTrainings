import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent, RegisterComponent } from 'src/app/components';

const routes: Routes = [
  {path: 'auth/login', component: LoginComponent},
  {path: 'auth/register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
