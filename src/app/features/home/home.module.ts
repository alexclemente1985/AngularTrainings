import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module'

@NgModule({
  imports: [HomeRoutingModule, NativeScriptCommonModule],
  declarations:[
    HomeComponent
  ],
  exports:[HomeComponent],
})
export class HomeModule{}
