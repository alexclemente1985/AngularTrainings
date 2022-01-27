import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {
  BookAuthorsComponent,
  BookComponent,
  BookDetailComponent,
  DvdComponent,
  DvdDetailComponent,
  DvdFormComponent,
  PageNotFoundComponent
} from "./components";


const appRoutes: Routes = [
  {path: 'dvds', component: DvdComponent},
  {path: 'dvds/new', component: DvdFormComponent},
  {path: 'dvds/:index', component: DvdDetailComponent},
  {path: 'books',
    component: BookComponent,
    children:[
      {path: ':index',
      component: BookDetailComponent,
      children: [
        {path: 'authors', component: BookAuthorsComponent},
      ]},
    ]
  },
  {path: 'electronics', loadChildren: ()=>import('./modules/index').then(m => m.ElectronicsModule)},
  {path: '', pathMatch: 'full', redirectTo: 'dvds'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations:[],
  imports:[RouterModule.forRoot(appRoutes)],
  exports:[RouterModule]
})
export class AppRoutingModule{}
