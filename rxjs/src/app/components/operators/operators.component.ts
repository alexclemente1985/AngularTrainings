import { Component, OnInit, ViewChild } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { debounceTime, delay, filter, finalize, first, from, fromEvent, interval, last, map, Observable, Subject, Subscription, take, takeUntil, takeWhile, tap, timer } from 'rxjs';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.scss']
})
export class OperatorsComponent implements OnInit {

  @ViewChild(MatRipple) ripple!: MatRipple;

  rippleCentered: boolean = true;
  rippleRadius = 40;

  searchInput: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  mapClick() {
    from([1,2,3,4,5,6,7])
    .pipe(
      map(i=>i*2),
      map(i=>i*10),
      delay(2000)
    )
    .subscribe(i=>console.log(i));

    fromEvent<MouseEvent>(document, 'click')
      .pipe(
        map((e: MouseEvent) => ({x: e.screenX, y: e.screenY}))
      )
      .subscribe((pos) => console.log(pos));
  }

  filterClick() {
    from([1,2,3,4,5,6,7])
    .pipe(
      filter(i=>i%2==1)
    )
    .subscribe(i=>console.log(i));

    interval(1000)
      .pipe(
        filter(i => i%2==0),
        map(i=>"Value: " + i),
        delay(1000))
      .subscribe(i=>console.log(i));
  }

  tapClick() {
    interval(1000)
      .pipe(
        tap(i => console.log('')),
        tap(i => console.warn('Before filtering: ', i)),
        filter(i => i%2==0),
        tap(i => console.warn('After filtering: ', i)),
        map(i=>"Value: " + i),
        tap(i => console.warn('After map: ', i)),
        delay(1000))
      .subscribe(i=>console.log(i));
  }

  takeClick() {
    const observable = new Observable((observer) => {
      let i;
      for(i=0;i<20;i++)
        setTimeout(()=>observer.next(Math.floor(Math.random()*100)), i*100);
        //setTimeout(()=>observer.complete(), i*100);
    });

    const s: Subscription = observable
      .pipe(
        tap(i=>console.log(i)),
        //take(10),
        //first()
        last()
      )
      .subscribe({
       next: (v: any)=>console.log('Output: ',v),
       error: (error: any) => {
         console.error(error);
      }
      });

    const interv = setInterval(()=>{
      console.log('Checking...');
      if(s.closed) {
        console.warn('Subscription CLOSED!');
        clearInterval(interv);
      }

    },200)
  }

  launchRipple() {
    const rippleRef = this.ripple.launch({
      persistent: true, centered: true });
    rippleRef.fadeOut();
  }

  debounceTimeClick() {
    fromEvent<MouseEvent>(document, 'click')
    .pipe(
      tap((e)=> console.log('Click')),
      debounceTime(1000)
    )
    .subscribe(
      (e: MouseEvent) => {
        console.log("Click with debounceTime: ", e);
        this.launchRipple();
      })
  }

  searchEntry$: Subject<string> =  new Subject<string>();
  searchBy_UsingDebounce(event: any) {
    this.searchEntry$.next(this.searchInput);
  }

  debounceTimeSearch() {
    this.searchEntry$
      .pipe(debounceTime(500))
      .subscribe((s)=> console.log(s))
  }

  takeWhileClick() {
    interval(500)
    .pipe(
      takeWhile((value,index) => (value<5)),
      finalize(() => console.log('Completed!')) )
    .subscribe({
      next: (i) => console.log('takeWhile: ', i),
      error: (error) => console.error(error),
      })
  }

  takeUntilSearch() {

    let duetime$ = timer(5000);

    interval(500)
    .pipe(
      takeUntil(duetime$),
      finalize(() => console.log('Completed!')))
    .subscribe({
      next: (i) => console.log('takeWhile: ', i),
      error: (error) => console.error(error),
      })

  }



}
