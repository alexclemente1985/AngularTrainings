import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    LoginComponent
  ]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        AuthService,
        AuthGuard
      ]
    }
  }
 }
