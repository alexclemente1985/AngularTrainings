import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElectronicDetailComponent, ElectronicListComponent } from 'src/app/components';
import { ElectronicsRoutingModule } from './electronics-routing.module';
import { MaterialModule } from '../index';

@NgModule({
  declarations: [ElectronicListComponent, ElectronicDetailComponent],
  imports: [
    CommonModule,
    ElectronicsRoutingModule,
    MaterialModule,
  ],
})
export class ElectronicsModule { }
