import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-simple-http-get',
  templateUrl: './simple-http-get.component.html',
  styleUrls: ['./simple-http-get.component.scss']
})
export class SimpleHttpGetComponent implements OnInit {

  simpleReqProdutsObs$!: Observable<Product[]>;

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
  }

  getSimpleHttpRequest(){
    this.simpleReqProdutsObs$ = this.productsService.getProducts();
  }

}
