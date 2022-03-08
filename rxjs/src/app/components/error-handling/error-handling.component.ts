import { Component, OnInit } from '@angular/core';
import { catchError, finalize, map, Observable, retryWhen, tap, throwError, timeout, timer } from 'rxjs';

@Component({
  selector: 'app-error-handling',
  templateUrl: './error-handling.component.html',
  styleUrls: ['./error-handling.component.scss']
})
export class ErrorHandlingComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

  startTest() {
    let obj: Observable<any> = new Observable((observer)=>{
      for(let i=0;i<10;i++) {
        if (i==7)
          observer.error(`An error occurred when i = ${i}`);
        else
          observer.next(i);
      }
    });
    obj
      .pipe(
        map(i=>i*10),
        tap(i=>console.log('Before error handling: ' + i)),
        catchError(error => {
          console.error('Inside catchError: ', error);
          //return of(0);
          return throwError(() => new Error('throwError: Error'));
        }),
        //retry(2),
        retryWhen(i => timer(5000))
      )
      /*
      .subscribe(
        i => console.log('Normal output: ' + i),
        err => console.log(err),
        () => console.log('Completed!')
      );*/

    let obj2: Observable<any> = new Observable((observer) => {
      timer(2000).subscribe((n) => observer.next(1000));
      timer(2500).subscribe((n) => observer.complete());
    });
    obj2
    .pipe(
      timeout(2400),
      finalize(() => console.log('Completed!'))
    )
    .subscribe({
     next: i => console.log('N: ' + i),
     error: err => console.log(err)
    }
    )

  }

}
