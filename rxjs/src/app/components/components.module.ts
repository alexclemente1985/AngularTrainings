import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicCreationComponent } from './basic-creation/basic-creation.component';
import { OperatorsComponent } from './operators/operators.component';
import { AsyncComponent } from './async/async.component';
import { ErrorHandlingComponent } from './error-handling/error-handling.component';
import { DragAndDropComponent } from './drag-and-drop/drag-and-drop.component';
import { UnsubscribeComponent } from './unsubscribe/unsubscribe.component';


@NgModule({
  declarations: [
    BasicCreationComponent,
    OperatorsComponent,
    AsyncComponent,
    ErrorHandlingComponent,
    DragAndDropComponent,
    UnsubscribeComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[
    BasicCreationComponent,
    OperatorsComponent,
    AsyncComponent,
    ErrorHandlingComponent,
    DragAndDropComponent,
    UnsubscribeComponent
  ]
})
export class ComponentsModule { }
