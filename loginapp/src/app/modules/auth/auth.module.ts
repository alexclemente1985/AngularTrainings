import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent, RegisterComponent, UserComponent } from 'src/app/components';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'src/app/interceptors';



@NgModule({
  declarations: [LoginComponent,RegisterComponent,UserComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
  
})
export class AuthModule {
  //Necessário para que o interceptor esteja disponibilizado globalmente na aplicação
  // caso o mesmo não esteja no mesmo nível do app.component
  static forRoot(): ModuleWithProviders<AuthModule>{
    return {
      ngModule: AuthModule,
      providers: [
        AuthInterceptor
      ]
    }
  }
 }
