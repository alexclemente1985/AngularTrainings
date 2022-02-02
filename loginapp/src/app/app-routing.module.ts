import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/main/people'},
  {
    path:'main', 
    loadChildren: () => import('./modules/index').then(m=>m.MainModule), 
    canActivate: [
      AuthGuard
    ]
  }
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
