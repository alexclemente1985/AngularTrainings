import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElectronicDetailComponent, ElectronicListComponent } from 'src/app/components';

const electronicRoutes: Routes = [
  /* {path: 'electronics', component: ElectronicListComponent},
  {path: 'electronics/:index', component: ElectronicDetailComponent}, */
  {path: '', component: ElectronicListComponent},
  {path: ':index', component: ElectronicDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(electronicRoutes)],
  exports: [RouterModule]
})
export class ElectronicsRoutingModule { }
