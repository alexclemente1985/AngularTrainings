import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Person } from 'src/app/models/person';
import constants from 'src/constants';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  readonly url = constants.SERVER_BASE_URL + constants.routes.API;

  constructor(
    private http: HttpClient
  ) { }

  getPeople(): Observable<Person[]>{
    return this.http.get<Person[]>(this.url + constants.api_routes.PEOPLE/* `${this.url}/people` */)
    .pipe(
      tap(p=>console.log(p)),
      catchError(()=>{
        return throwError(()=> new Error(constants.error_msgs.server.PEOPLE_API_ERROR/* 'People api error' */) )
      })
    );
   }
}
