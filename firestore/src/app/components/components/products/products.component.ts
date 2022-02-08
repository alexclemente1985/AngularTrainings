import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { NotificationService, ProductService } from 'src/app/services';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products$!: Observable<Product>;
  filteredProds$!: Observable<Product[]>;

  displayedColumns: string[] = ["name", "stock", "price", "operations"];

  initialProductFormValues = {
    id: undefined,
    name: '',
    stock: 0,
    price: 0
  }

  @ViewChild('name') productName!: ElementRef;

  dataSource!: MatTableDataSource<any>;

  productForm = this.fb.group({
    id: [this.initialProductFormValues.id],
    name: [this.initialProductFormValues.name, [Validators.required]],
    stock: [this.initialProductFormValues.stock, [Validators.required]],
    price: [this.initialProductFormValues.price, [Validators.required]],
  })


  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.getProductsForTable();
  }

  addProduct(p: Product){
    return this.productService.addProduct(p)
    .then(()=>{
      this.notificationService.showNotification('Product has been added.');
      this.productForm.reset(this.initialProductFormValues);
      this.productName.nativeElement.focus();
    })
    .catch(()=> this.notificationService.showNotification('Error on submitting the product.'))
  }

  edit(p:Product){
    this.productForm.setValue(p);
  }

  updateProduct(p: Product){
    this.productService.updateProduct(p)
    .then(()=>{
      this.notificationService.showNotification('Product has been updated');
      this.productForm.reset(this.initialProductFormValues);
      this.productName.nativeElement.focus();
    })
    .catch(()=> this.notificationService.showNotification('Error while updating product.'));
  }

  del(p: Product){
    this.productService.deleteProduct(p)
    .then(()=>this.notificationService.showNotification('Product has been removed'))
    .catch(()=> this.notificationService.showNotification('Error while deleting product.'));
  }

  filter(event: any){
    this.filteredProds$ = this.productService.searchByName(event.target.value);
  }

  onSubmit(){
    const p = this.productForm.value
    if(!p.id){
      this.addProduct(p);
    } else{
      this.updateProduct(p);
    }
  }

  async getProductsForTable(){
    try{
      this.productService.getProducts()
      .subscribe(
        {
          next: (prods)=>{
            this.dataSource = new MatTableDataSource(prods);
          },
          error: (e) => this.notificationService.showNotification(`Error while loading products: ${e}`)
        }
      )
    }
    catch(e){
      console.log(e);
      this.notificationService.showNotification(`Error: ${e}`);
    }
  }

}
