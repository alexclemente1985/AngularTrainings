import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-loading-get-product-ids',
  templateUrl: './loading-get-product-ids.component.html',
  styleUrls: ['./loading-get-product-ids.component.scss']
})
export class LoadingGetProductIDsComponent implements OnInit {

  bLoading: boolean = false;
  productIds: Product[] = [];

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
  }

  getProductIds(){
    this.productsService.getProductIds()
    .subscribe(
      (ids) => {
        this.productIds = ids.map(id => ({_id: id, name: '', department: '', price: 0}))
      }
    )
  }
  loadName(id: string | undefined){
    if(id){
      this.productsService.getProductName(id)
      .subscribe(
        name=> {
          let index = this.productIds.findIndex(p=>p._id===id);
          if(index >=0){
            this.productIds[index].name = name;
          }
        }
      )
    }
  }

}
