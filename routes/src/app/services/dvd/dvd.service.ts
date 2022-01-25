import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Dvd } from 'src/app/models/dvd';

@Injectable({
  providedIn: 'root'
})
export class DvdService {

  private dvdSubject$: BehaviorSubject<Dvd[]> = new  BehaviorSubject<Dvd[]>([]);
  public dvd$ = this.dvdSubject$.asObservable();

  constructor() {
    timer(2000)
    .subscribe(
      () => {
        this.dvdSubject$.next([
          {title: 'DVD - Ramones', year: 1987, genre: 'Music'},
          {title: 'MIB', year: 1997, genre: 'Movie'}
        ])
      }
      )
   }

   add(d: Dvd){
    this.dvdSubject$.getValue().push(d);
   }

   remove(i: number){
    let dvd = this.dvdSubject$.getValue();

    if(i>=0 && i<dvd.length){
      dvd.splice(i,1);
    }
   }

   get(i: number): Observable<Dvd | null>{
    return this.dvd$.pipe(
      map((dvd: Dvd[])=> (i>=0 && i<dvd.length) ? dvd[i] : null),
      delay(1000)
    )
   }
}
