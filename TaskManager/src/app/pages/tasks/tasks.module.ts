import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core"
import { TasksComponent } from "./tasks.component"
import { NativeScriptCommonModule } from "@nativescript/angular"
import { TasksRoutingModule } from "./tasks-routing.module"

@NgModule({
  imports: [NativeScriptCommonModule, TasksRoutingModule],
  declarations: [TasksComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class TasksModule {}
