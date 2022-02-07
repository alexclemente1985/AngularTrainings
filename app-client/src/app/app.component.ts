import { Component } from '@angular/core';
import { tap } from 'rxjs';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(
      private productService: ProductsService
    ){}

    ngOnInit(): void{
      this.productService.getProducts()
      .subscribe(
        (p)=>console.log(p)
      )
    }
}
