import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from './modules/index';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/main/people'},
  {path:'main', loadChildren: () => import('./modules/index').then(m=>m.MainModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(){
    console.log('iniciando routing module')
  }
 }
