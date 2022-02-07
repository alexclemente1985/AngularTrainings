import { Component, Input, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Product } from 'src/app/models';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-template-card',
  templateUrl: './template-card.component.html',
  styleUrls: ['./template-card.component.scss']
})
export class TemplateCardComponent implements OnInit {

  @Input() isProductsError: boolean = false;
  @Input() isSimpleProducts: boolean = false;
  @Input() isLoadingProducts: boolean = false;
  @Input() isLoadingProductsID: boolean = false;
  @Input() isDeleteProduct: boolean = false;
  @Input() isEditProduct: boolean = false;

  

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
  }

  /* getSimpleHttpRequest(){
    this.simpleReqProdutsObs$ = this.productsService.getProducts();
  } */

}
