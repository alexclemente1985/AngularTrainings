import { Component, OnInit } from '@angular/core';
import { delay, map, Observable, Observer, toArray } from 'rxjs';

interface User {
  login: string;
  name: string;
}

@Component({
  selector: 'app-async',
  templateUrl: './async.component.html',
  styleUrls: ['./async.component.scss']
})
export class AsyncComponent implements OnInit {
  options$!: Observable<string[]>;
  user$!: Observable<User>;

  constructor() { }

  ngOnInit() {
    console.log('kct funciona caramba!')
    this.options$ = new Observable(
      (observer) => {
        for(let i=0;i<10;i++) {
          observer.next(`This is my ${i}th option` );
        }
        observer.complete();
      }
    )
    .pipe(
      map(s=>s+'!'),
      toArray(),
      delay(1000)
    );
    this.options$.subscribe(s=>console.log(s));

    this.user$ = new Observable<User>((observer) => {
      let names  = ["Mr. James", "Mr. John", "Mr. Ray", "Ms. Angel"];
      let logins = ["james", "john", "ray", "angel"];
      let i = 0;
      console.log("Here in user$")
      setInterval(()=>{
        if (i==4)
          observer.complete();
        else {
          observer.next({login: logins[i], name: names[i]});
        }
        i++;
      }, 3000)
    })
    //this.user$.subscribe(s=>console.log(s));

  }
}
