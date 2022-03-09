import { Component, OnInit } from '@angular/core';
import { interval, fromEvent, Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.scss']
})
export class UnsubscribeComponent implements OnInit {

  subscriptionsAreActive = false;
  subscriptions: Subscription[] = [];
  unsubscribeAll$: Subject<void> = new Subject();
  intervalSubscription: Subscription | null = null;
  constructor() { }

  ngOnInit(): void {
    this.checkSubscriptions();
  }

  checkSubscriptions(){
    this.intervalSubscription = interval(100).subscribe({
      next: () =>{
        let active = false;
        this.subscriptions.forEach((s) => {
          if (!s.closed)
            active = true;
        })
        this.subscriptionsAreActive = active;
      }
    })
  }

  subscribe(){
    const subsc1 = interval(100)
    .pipe(
      takeUntil(this.unsubscribeAll$)
    )
    .subscribe({
      next: (i) => {
        console.log(i)
      }
    });

    const subsc2 = fromEvent(document, 'mousemove')
    .pipe(takeUntil(this.unsubscribeAll$))
    .subscribe({
      next: (e) => console.log(e)
    });

    this.subscriptions.push(subsc1);
    this.subscriptions.push(subsc2);
  }

  unsubscribe(){
    this.unsubscribeAll$.next();
  }

  ngOnDestroy(){
    if (this.intervalSubscription!=null)
      this.intervalSubscription.unsubscribe();
    console.log('Destroy');
    this.unsubscribeAll$.next();
  }

}
