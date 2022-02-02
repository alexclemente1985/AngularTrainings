import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeopleComponent, ProductsComponent } from 'src/app/components';


const mainRoutes: Routes = [
  {path: '',  redirectTo: 'people'},
  {path: 'people', component: PeopleComponent},
  {path: 'products', component: ProductsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(mainRoutes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
  constructor(){
    console.log('Iniciando Main Routing')
  }
 }
