import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatToolbarModule
  ],
  exports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatToolbarModule
  ]
})
export class MaterialModule { }
