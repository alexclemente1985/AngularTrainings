import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from './modules/material/material.module';
import { MyfirstComponent, MySecondComponent, MyThirdComponent } from './secao1/components';
import { StringInterpolationComponent, PropertyBindingComponent } from './secao2/components';
import { Secao1Module } from './secao1/secao1.module';
import { Secao2Module } from './secao2/secao2.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    Secao1Module,
    Secao2Module,
    MaterialModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
