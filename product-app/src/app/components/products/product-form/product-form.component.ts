import { Component, Input, OnInit } from '@angular/core';
import { Department } from 'src/app/models';
import { DepartmentService } from 'src/app/services';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  description: string = '';
  name: string = '';
  price!: number;
  department!: Department | null;
  departments: Department[] = []

  constructor(
    private productService: ProductService,
    private departmentService: DepartmentService
    ) { }

  ngOnInit(): void {
    this.departments = this.departmentService.getDepartments();
  }

  clear(){
    this.name = '';
    this.department = null;
    this.description = '';
    this.price = 0;
  }
  save(){
    this.productService.addProduct({
      name: this.name,
      price: this.price,
      description: this.description,
      department: this.department as Department
    });

    this.clear();
  }

}
