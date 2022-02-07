import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Product } from 'src/app/models';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-http-get-products-error',
  templateUrl: './http-get-products-error.component.html',
  styleUrls: ['./http-get-products-error.component.scss']
})
export class HttpGetProductsErrorComponent implements OnInit {

  productsErrorHandling: Product[] = [];

  constructor(
    private productsService: ProductsService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  getProductsWithErrorHandling(){
    this.productsService.getProductsError()
    .subscribe({
      next: (p)=> { this.productsErrorHandling = p},
      error: (err) => {
        console.log(err);
        console.log("Message: ", err.error.msg);
        console.log("Status code: ", err.status);
        let config = new MatSnackBarConfig();
        config.duration = 2000;
        config.panelClass = ['snack_error'];
        //status retornado quando offline
        if(err.status == 0){
          this.snackBar.open("Could not connect to the server.", "", config);  
        }else{
          this.snackBar.open(err.error.msg, "", config);
        }
      }
    }
    )
  }

  getProductsWithErrorHandlingOk(){
    this.productsService.getProductsErrorDelay()
    .subscribe({
      next: (p)=> { 
        this.productsErrorHandling = p;
        let config = new MatSnackBarConfig();
        config.duration = 2000;
        config.panelClass = ['snack_ok'];
        //status retornado quando offline
        this.snackBar.open("Products successfully loaded.", "", config);  
      },
      error: (err) => {
        console.log(err);
               
      }
    }
    )
  }

}
