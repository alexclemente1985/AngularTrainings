
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-rxjs-hot-observables-intro',
  templateUrl: './rxjs-hot-observables-intro.component.html',
  styleUrls: ['./rxjs-hot-observables-intro.component.scss']
})
export class RxjsHotObservablesIntroComponent implements OnInit {

  @ViewChild('myButton') button: ElementRef;

  n1: number = 0;
  n2: number = 0;
  s1: string = '';
  s2: string = '';

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    let myBtnClickObservable: Observable<any> = fromEvent(
      this.button.nativeElement, 'click');
    myBtnClickObservable.subscribe( (event) => console.log('button clicked 1'));
    myBtnClickObservable.subscribe( (event) => console.log('button clicked 2'));

    class Producer {
      private myListeners: any[] = [];
      private n = 0;
      private id: any;

      addListener(l: any) {
        this.myListeners.push(l);
        console.log(this.myListeners.length);
      }

      start() {
        this.id = setInterval(()=>{
          this.n++;
          console.log('From Producer: ' + this.n);
          for(let l of this.myListeners)
            l(this.n);
        }, 1000);
      }

      stop() {
        clearInterval(this.id);
      }

    }

    let producer:  Producer = new Producer();
    producer.start();
    setTimeout(
      ()=>{
        producer.addListener((n: any) => console.log('From listener 1', n));
        producer.addListener((n: any) => console.log('From listener 2', n));
      }, 4000);

    const myHotObservable = new Observable(
      (observer: Observer<number>)=> {
        producer.addListener( (n: number) => observer.next(n))
      }
    );
    myHotObservable.subscribe((n) => console.log('From Subscriber 1', n));
    myHotObservable.subscribe((n) => console.log('From Subscriber 2', n));

  }
}
