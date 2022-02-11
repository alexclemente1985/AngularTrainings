import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from 'src/app/components/login/login.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
  ],
  exports:[
    RegisterComponent,
    LoginComponent,
  ]
})
export class AuthModule { }
