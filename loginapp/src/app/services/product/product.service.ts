import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Product } from 'src/app/models/product';
import constants from 'src/constants';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  readonly url = constants.SERVER_BASE_URL + constants.routes.API;

  constructor(
    private http: HttpClient
  ) { }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.url + constants.api_routes.PRODUCTS)
    .pipe(
      tap(p=>console.log(p)),
      catchError(()=>{
        return throwError(()=> new Error(constants.error_msgs.server.PEOPLE_API_ERROR) )
      })
    );
  }
}
