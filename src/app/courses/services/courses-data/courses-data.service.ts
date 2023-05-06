import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { map, Observable, tap } from 'rxjs';
import { Course } from '../../models/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesDataService extends DefaultDataService<Course>{

  constructor(http:HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Course', http, httpUrlGenerator)
   }

   override getAll(): Observable<Course[]> {
    return this.http.get('/api/courses')
        .pipe(
          map((res: any) => res["payload"])
        );
}
}
