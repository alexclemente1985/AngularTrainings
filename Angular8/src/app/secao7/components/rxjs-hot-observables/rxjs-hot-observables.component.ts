import { Component, OnInit } from '@angular/core';
import { ConnectableObservable, Observable, Observer, Subject } from 'rxjs';
import { publish, refCount, share } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs-hot-observables',
  templateUrl: './rxjs-hot-observables.component.html',
  styleUrls: ['./rxjs-hot-observables.component.scss']
})
export class RxjsHotObservablesComponent implements OnInit {

  n: number = 0;
  n1: number = 0;
  n2: number = 0;
  s1: string = '';
  s2: string = '';

  myObservable: Observable<number>;
  constructor() { }

  ngOnInit(): void {
    this.myObservable = new Observable(
      (observer: Observer<number>)=>{
        let i: number = 0;
        console.log('%c Observable Created', 'background: #cccc; color: #ff0000');
        setInterval(()=>{
          i++;
          console.log('%c i = '+i, 'background: #cccc; color: #0000ff');
          (i==100)? observer.complete() : observer.next(i);
        },1000)
      }
    )
    //this.usingSubjects();
    //this.usingPublish();
    this.usingShare();
  }

  usingSubjects(){
    const subject = new Subject<number>();
    this.myObservable.subscribe(subject);

    this.s1 = "wainting for interval...";

    //subscribe 1
    setTimeout(()=>{
      subject.subscribe((n:any)=>{
        this.n1 = n;
        this.s1 = "OK";
      })
    },2000);

    //subscribe 2
    setTimeout(()=>{
      subject.subscribe((n:any)=>{
        this.n2 = n;
        this.s2 = "OK";
      })
    },4000)
  }

  usingPublish(){
    /* const multicasted = this.myObservable.pipe(
      publish(),
      refCount()
    ) */

    const multicasted: ConnectableObservable<number> = this.myObservable.pipe(
      publish()
    ) as ConnectableObservable<number>;

    multicasted.connect();

    this.s1 = "waiting for interval...";

    //subscribe 1
    setTimeout(()=>{
      multicasted.subscribe((n:any)=>{
        this.n1 = n;
        this.s1 = "OK";
      })
    },2000);

    this.s2 = "waiting for interval...";
    //subscribe 2
    setTimeout(()=>{
      multicasted.subscribe((n:any)=>{
        this.n2 = n;
        this.s2 = "OK";
      })
    },4000)
  }

  usingShare(){
    const multicasted: ConnectableObservable<number> = this.myObservable.pipe(
      share()
    ) as ConnectableObservable<number>;


    this.s1 = "waiting for interval...";

    //subscribe 1
    setTimeout(()=>{
      multicasted.subscribe((n:any)=>{
        this.n1 = n;
        this.s1 = "OK";
      })
    },2000);

    this.s2 = "waiting for interval...";
    //subscribe 2
    setTimeout(()=>{
      multicasted.subscribe((n:any)=>{
        this.n2 = n;
        this.s2 = "OK";
      })
    },4000)
  }


}
