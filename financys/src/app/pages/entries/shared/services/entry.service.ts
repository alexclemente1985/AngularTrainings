import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, flatMap, map, mergeMap, Observable, throwError } from 'rxjs';
import { CategoryService } from 'src/app/pages/categories/shared/services/category.service';
import { Entry } from '../models/entry.model';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private apiPath: string = "api/entries";
  constructor(
    private http: HttpClient,
    private categoryService: CategoryService
  ) { }

  getAll(): Observable<Entry[]>{
    return this.http.get(this.apiPath)
    .pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntries)
    )
  }

  getById(id: number): Observable<Entry>{
    const url = `${this.apiPath}/${id}`;

    return this.http.get(url)
    .pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntry)
    )
  }

  create(entry: Entry): Observable<Entry>{

   return this.categoryService.getById(entry.categoryId as number)
    .pipe(
      //permite o retorno de Observable<Entry> e não Observable<Observable<Entry>>)
      mergeMap(category => {
        entry.category = category;
        return this.http.post(this.apiPath, entry)
        .pipe(
            catchError(this.handleError),
            map(this.jsonDataToEntry)
         )
      })
    )
  }

  update(entry: Entry): Observable<Entry>{
    const url = `${this.apiPath}/${entry.id}`;

    return this.categoryService.getById(entry.categoryId as number)
    .pipe(
      mergeMap(category =>{
        entry.category = category;
        return this.http.put(url, entry)
        .pipe(
          catchError(this.handleError),
          map(()=> entry)
        )
      })
    )
  }

  delete(id: number): Observable<any>{
    const url = `${this.apiPath}/${id}`;
    return this.http.delete(url)
    .pipe(
      catchError(this.handleError),
      map(()=> null)
    )
  }

  private jsonDataToEntry(jsonData: any): Entry{
    return Object.assign(new Entry(), jsonData);//jsonData as Entry;
  }

  private jsonDataToEntries(jsonData: any[]): Entry[]{
    const entries: Entry[] = [];
    jsonData.forEach(
      element => {
        //Permite que método get paidText do entry.service funcione
        const entry = Object.assign(new Entry(), element);
        entries.push(entry)
      }
    );
    return entries;
  }

  private handleError(error: any): Observable<any>{
    return throwError(()=> new Error(error))
  }
}
