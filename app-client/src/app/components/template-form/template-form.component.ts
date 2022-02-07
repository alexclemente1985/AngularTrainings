import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Product } from 'src/app/models';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss']
})
export class TemplateFormComponent implements OnInit {

  newlyProducts: Product[] = [];

  constructor(
    private productsService: ProductsService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  saveProduct(name: string, department: string, price: string){

    const parsedIntPrice = parseInt(price,10);
    let p = {name, department, price: parsedIntPrice}
    let config = new MatSnackBarConfig();
    config.duration = 2000;

    this.productsService.saveProduct(p)
    .subscribe({
      next:  (p: Product)=>{
        config.panelClass = ['snack_ok'];
        this.snackBar.open("Products successfully inserted.", "", config);  
        this.newlyProducts.push(p);
      },
      error: (err)=>{
        console.log(err);
        config.panelClass = ['snack_error'];
        if(err.status == 0){
          this.snackBar.open("Could not connect to the server.",  '',config);
        }
        else{
          this.snackBar.open(err.msg, "", config);
        }
        
      }
    })
  }

  

}
