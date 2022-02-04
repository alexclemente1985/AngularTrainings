import { EventEmitter, Injectable, Output } from '@angular/core';
import { Product } from 'src/app/models';
import { DepartmentService } from '..';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  /* @Output()  */onNewProduct: EventEmitter<Product> = new EventEmitter<Product>();

  private dataFromServer: any[]=[
    {id: 1, name: "Laptop", department_id: 4, price: 40, description: "Laptop Description"},
    {id: 2, name: "Shirt", department_id: 1, price: 10, description: "Shirt Description"},
    {id: 3, name: "Polo", department_id: 1, price: 50, description: "Polo Description"},
    {id: 4, name: "Mouse", department_id: 3, price: 40, description: "Mouse Description"},
  ]
  private products: Product[] = [];

  private nextID: number = 0;

  constructor(private departmentService: DepartmentService) { 
    for(let p of this.dataFromServer){
      this.products.push({
        id: p.id,
        name: p.name,
        description: p.description,
        price: p.price,
        department: this.departmentService.getDepartmentByID(p.id)
      });
      this.nextID = ++p.id;
    }
  }

  getProducts(): Product[]{
    return this.products;
  }

  addProduct(p: Product): void{
    let prod: Product = {id: this.nextID++, ...p};
    this.products.push(prod);
    console.log(this.products);

    this.onNewProduct.emit(prod);
  }
}
