import { NgModule } from "@angular/core"
import { Routes } from "@angular/router"
import { NativeScriptRouterModule } from "@nativescript/angular"

const routes: Routes = [
  { path: "", redirectTo: "/pages", pathMatch: "full" },
  {
    path: "pages",
    loadChildren: () => import("./pages/pages.module").then(m => m.PagesModule)
  },
  {
    path: "items",
    loadChildren: () => import("./item/items.module").then(m => m.ItemsModule)
  },
  {
    path: "tasks",
    loadChildren: () => import("./pages/tasks/tasks.module").then(m => m.TasksModule)
  }
 ]

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
