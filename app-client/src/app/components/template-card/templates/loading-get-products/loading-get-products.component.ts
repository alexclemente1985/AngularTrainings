import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Product } from 'src/app/models';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-loading-get-products',
  templateUrl: './loading-get-products.component.html',
  styleUrls: ['./loading-get-products.component.scss']
})
export class LoadingGetProductsComponent implements OnInit {
  productsLoading: Product[] = [];
  bLoading: boolean = false;

  constructor(
    private productsService: ProductsService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  getProductsLoading(){
    this.bLoading = true;
    this.productsService.getProductsErrorDelay()
    .subscribe({
      next: (p)=> { 
        this.productsLoading = p;
        this.bLoading = false;
        let config = new MatSnackBarConfig();
        config.duration = 2000;
        config.panelClass = ['snack_ok'];
        //status retornado quando offline
        this.snackBar.open("Products successfully loaded.", "", config);  
      },
      error: (err) => {
        console.log(err);
        this.bLoading = false;
               
      }
    }
    )
  }

}
