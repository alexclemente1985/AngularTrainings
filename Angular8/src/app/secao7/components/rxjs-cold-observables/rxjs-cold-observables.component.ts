import { Component, OnInit } from '@angular/core';
import { interval, Observable, Observer, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs-cold-observables',
  templateUrl: './rxjs-cold-observables.component.html',
  styleUrls: ['./rxjs-cold-observables.component.scss']
})
export class RxjsColdObservablesComponent implements OnInit {


  subscription1!: Subscription;
  subscription2!: Subscription;
  n1: number = 0;
  n2: number = 0;
  s1: string = '';
  s2: string = '';

  constructor() { }

  ngOnInit(): void {
    this.s1 = 'Initializing...';
    this.s2 = 'Initializing...';

    const myIntervalObservable = new Observable(
      (observer: Observer<any>)=>{
        let i: number = 0;
        const id = setInterval(()=>{
          i++;
          console.log('from Observable: ', i);
          if(i===10){
            observer.complete();
          }else if (i%2===0){
            observer.next(i);
          }
        },1000);
        return () => {
          clearInterval(id);
        }
      }
    );

    this.subscription1 = myIntervalObservable.subscribe(
      (n)=>{this.n1 = n},
      (e)=>{this.s1 = "Error: ", + e},
      ()=>{this.s1 = "Completed!"}
    );

    this.s2="waiting for interval...";

    setInterval(()=>{
      this.subscription2 = myIntervalObservable.subscribe(
        (n)=>{this.n2 = n},
        (e)=>{this.s2 = "Error: ", + e},
        ()=>{this.s2 = "Completed!"}
      )
    },3000)


    setTimeout(()=>{
      this.subscription1.unsubscribe();
      this.subscription2.unsubscribe();
    },15000)
  }

}
