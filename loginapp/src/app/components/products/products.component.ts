import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products$!: Observable<Product[]>

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    console.log('indo para rota products')
    this.products$ = this.productService.getProducts();
  }

}
