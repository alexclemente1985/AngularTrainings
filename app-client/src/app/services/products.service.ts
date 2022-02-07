import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  readonly url: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {
    
   }

   getProducts():Observable<Product[]>{
     console.log('vai retornar prods')
    return this.http.get<Product[]>(`${this.url}/products`);
  }

  getProductsError(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.url}/products_err`);
  }
  
  getProductsErrorDelay(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.url}/products_delay`);
  }

  getProductIds(): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}/product_ids`);
  }

  getProductName(id: string): Observable<string>{
    return this.http.get(`${this.url}/products/name/${id}`,
    {responseType: "text"});
  }

  saveProduct(p: Product){
    return this.http.post<Product>(`${this.url}/products`, p);
  }

  deleteProduct(p: Product){
    return this.http.delete(`${this.url}/products/${p._id}` )
  }

  editProduct(p: Product) : Observable<Product>{
    return this.http.patch<Product>(`${this.url}/products/${p._id}`,p);
  }

}
