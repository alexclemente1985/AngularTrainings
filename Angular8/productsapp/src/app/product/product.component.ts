import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Department, Product } from '../interfaces';
import { DepartmentService } from '../services/department/department.service';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  productForm: FormGroup = this.fb.group({
    _id: [null],
    name: ['',[Validators.required]],
    stock: [0,[Validators.required, Validators.min(0)]],
    price: [0,[Validators.required, Validators.min(0)]],
    departments: [[] as Department[] | string[],[Validators.required]],
  })

  //Necessário para contornar problema da não remoção da classe invalid quando form material reseta
  @ViewChild('form')
  form!: NgForm;

  products: Product[] = [];
  departments: Department[] = [];

  private unsubscribe$: Subject<any> = new Subject<any>()

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private snackbar: MatSnackBar
    ) { }

   ngOnInit(): void {

    this.productService.get()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((prods: Product[]) => this.products = prods);

    this.departmentService.get()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((deps: Department[]) => this.departments = deps);




  }

  save(){
    let data = this.productForm.value;
    if (data._id != null) {
      this.productService.update(data)
        .subscribe(
          (p)=> this.notify("Updated!")
        );
    }
    else {
      this.productService.add(data)
        .subscribe(
          (p) => this.notify("Inserted!!")
        );
    }
    this.resetForm();
  }
  delete(prod: Product){
    this.productService.del(prod)
    .subscribe(
      ()=>this.notify('Removed!'),
      (err)=>console.log(err))
  }
  edit(prod: Product){
    this.productForm.setValue(prod);
  }

  notify(msg: string) {
    this.snackbar.open(msg, "OK", {duration: 3000});
  }

  resetForm() {
    //this.productForm.reset();
    // Checar: https://github.com/angular/material2/issues/4190
    this.form.resetForm();
  }

  ngOnDestroy(): void{
    this.unsubscribe$.next();
  }

  isProductsOk(){
    return !!this.products && this.products.length>0;
  }

}
