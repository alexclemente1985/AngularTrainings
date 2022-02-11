import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { MainRoutingModule } from './main-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from '../auth/auth-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MainRoutingModule,
  ],
})
export class MainModule {
  constructor(){
    console.log('Carregou main module')
  }
}
