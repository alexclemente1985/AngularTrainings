import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Person } from 'src/app/models/person';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  readonly url = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient
  ) { }

  getPeople(): Observable<Person[]>{
   return this.http.get<Person[]>(`${this.url}/people`)
   .pipe(
     tap(p=>console.log(p)),
     catchError(()=>{
       return throwError(()=> new Error('People api error') )
     })
   );
  }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.url}/products`)
    .pipe(
      tap(p=>console.log(p)),
      catchError(()=>{
        return throwError(()=> new Error('Products api error') )
      })
    );
  }
}
