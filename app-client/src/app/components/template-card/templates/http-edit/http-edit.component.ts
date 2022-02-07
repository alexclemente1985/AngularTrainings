import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, filter, switchMap, tap } from 'rxjs';
import { DialogEditProductComponent } from 'src/app/components';
import { Product } from 'src/app/models';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-http-edit',
  templateUrl: './http-edit.component.html',
  styleUrls: ['./http-edit.component.scss']
})
export class HttpEditComponent implements OnInit {

  productsToEdit: Product[] = [];

  constructor(
    private productsService: ProductsService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  editProduct(p: Product){
    let newProduct: Product ={...p}
    let dialogRef = this.dialog.open(DialogEditProductComponent, {
      width: '400px',
      data: newProduct
    });

    dialogRef.afterClosed()
    .pipe(
      filter(prod => prod !== undefined),
      switchMap(
        (prod: Product)=> this.productsService.editProduct(prod)
      )
    )
    .subscribe(
      {
        next: (prod: Product) => {
          let i = this.productsToEdit.findIndex(prd => p._id == prd._id);
          if(i>=0){
            this.productsToEdit[i] = prod;
          }
        },
        error: (err) => {
          console.log(err)
        }
      }
    )
  }

  loadProductsToEdit(){
    this.productsService.getProducts()
    .subscribe({
      next: (prods) =>{
        this.productsToEdit = prods;
      },
      error: (e) => {
        console.log('eita ',e);
      }
    })
  }
}
