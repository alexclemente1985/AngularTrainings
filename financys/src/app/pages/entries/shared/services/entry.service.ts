import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Entry } from '../models/entry.model';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private apiPath: string = "api/entries";
  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Entry[]>{
    return this.http.get(this.apiPath)
    .pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategories)
    )
  }

  getById(id: number): Observable<Entry>{
    const url = `${this.apiPath}/${id}`;

    return this.http.get(url)
    .pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategory)
    )
  }

  create(entry: Entry): Observable<Entry>{
    return this.http.post(this.apiPath, entry)
    .pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategory)
    )
  }

  update(entry: Entry): Observable<Entry>{
    const url = `${this.apiPath}/${entry.id}`;

    return this.http.put(url, entry)
    .pipe(
      catchError(this.handleError),
      map(()=> entry)
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

  private jsonDataToCategory(jsonData: any): Entry{
    return jsonData as Entry;
  }

  private jsonDataToCategories(jsonData: any[]): Entry[]{
    const entries: Entry[] = [];
    jsonData.forEach(
      element => entries.push(element as Entry)
    );
    return entries;
  }

  private handleError(error: any): Observable<any>{
    console.log("Erro na requisição => ", error);
    return throwError(()=> new Error(error))
  }
}
