import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/models';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-http-delete',
  templateUrl: './http-delete.component.html',
  styleUrls: ['./http-delete.component.scss']
})
export class HttpDeleteComponent implements OnInit {

  productsToDelete: Product[] = [];

  constructor(
    private productsService: ProductsService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  deleteProduct(p: Product){
    this.productsService.deleteProduct(p)
    .subscribe(
      {
        next: () =>{
          let i = this.productsToDelete.findIndex(prod => p._id == prod._id);
          if(i>=0){
            this.productsToDelete.splice(i,1);
          }
        },
        error: (e) => {
          console.log(e);
        }
      }
    )
  }

  loadProductsToDelete(){
    this.productsService.getProducts()
    .subscribe({
      next: (prods) =>{
        this.productsToDelete = prods;
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

}
