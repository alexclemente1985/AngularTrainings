import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core"
import { ItemsRoutingModule } from "./items-routing.module"
import { ItemsComponent } from "./items.component"
import { NativeScriptCommonModule } from "@nativescript/angular"
import { ItemDetailComponent } from "./item-detail.component"

@NgModule({
  imports: [ NativeScriptCommonModule, ItemsRoutingModule],
  declarations: [ItemsComponent, ItemDetailComponent],
  exports:[ItemsComponent, ItemDetailComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ItemsModule {}
