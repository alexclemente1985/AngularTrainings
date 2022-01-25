import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BookComponent, DvdComponent, DvdDetailComponent, PageNotFoundComponent } from "./components";


const appRoutes: Routes = [
  {path: 'dvds', component: DvdComponent},
  {path: 'dvds/:index', component: DvdDetailComponent},
  {path: 'books', component: BookComponent},
  {path: '', pathMatch: 'full', redirectTo: 'dvds'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations:[],
  imports:[RouterModule.forRoot(appRoutes)],
  exports:[RouterModule]
})
export class AppRoutingModule{}
