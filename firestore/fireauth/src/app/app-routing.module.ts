import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from './components/components.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { MaterialModule } from './shared';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/main/people'},
  {path: 'main', loadChildren: ()=>import('./shared/modules').then(m => m.MainModule), canActivate: [AuthGuardService]},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
