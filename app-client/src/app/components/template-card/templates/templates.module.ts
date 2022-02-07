import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/shared";
import { LoadingGetProductsComponent } from "./loading-get-products/loading-get-products.component";
import { HttpGetProductsErrorComponent } from "./http-get-products-error/http-get-products-error.component";
import { SimpleHttpGetComponent } from "./simple-http-get/simple-http-get.component";
import { LoadingGetProductIDsComponent } from './loading-get-products-id/loading-get-product-ids.component';
import { HttpDeleteComponent } from './http-delete/http-delete.component';
import { HttpEditComponent } from './http-edit/http-edit.component';

@NgModule({
    declarations: [
        SimpleHttpGetComponent,
        HttpGetProductsErrorComponent,
        LoadingGetProductsComponent,
        LoadingGetProductIDsComponent,
        HttpDeleteComponent,
        HttpEditComponent
    ],
    imports: [
        CommonModule, 
        FormsModule, 
        MaterialModule,
        HttpClientModule,
    ],
    exports: [
        SimpleHttpGetComponent,
        HttpGetProductsErrorComponent,
        LoadingGetProductsComponent,
        LoadingGetProductIDsComponent,
        HttpDeleteComponent,
        HttpEditComponent
    ],
    
})
export class TemplatesModule { }