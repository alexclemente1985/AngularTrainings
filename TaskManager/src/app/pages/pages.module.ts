import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core"
import { SignInComponent } from "./sign-in/sign-in.component"
import { TasksComponent } from "./tasks/tasks.component"
import { NativeScriptCommonModule } from "@nativescript/angular"
import { PagesRoutingModule } from "./pages-routing.module"

@NgModule({
  imports: [NativeScriptCommonModule, PagesRoutingModule],
  declarations: [SignInComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class PagesModule {}
