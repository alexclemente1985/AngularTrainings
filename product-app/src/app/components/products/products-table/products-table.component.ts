import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { switchMap, tap } from 'rxjs';
import { Product } from 'src/app/models';
import { ProductService } from 'src/app/services';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit {

  @ViewChild(MatTable) dataTable!: MatTable<any>;

  products!: Product[];
  prodColumns: string[] = ["id","prodname","price","description","department"]

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    this.productService.onNewProduct
    .pipe(
      tap(p=>console.log(p))
    ).subscribe(
      ()=> this.dataTable.renderRows()
    )
  }

}
