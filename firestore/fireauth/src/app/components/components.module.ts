import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared';
import { PeopleComponent } from './people/people.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PeopleComponent,
    NotFoundComponent,
    //RegisterComponent,
   // LoginComponent
  ],
  imports: [
    CommonModule, MaterialModule, ReactiveFormsModule
  ],
  exports: [
    PeopleComponent,
    NotFoundComponent,
    //RegisterComponent,
    //LoginComponent,
    //MaterialModule
  ]
})
export class ComponentsModule { }
