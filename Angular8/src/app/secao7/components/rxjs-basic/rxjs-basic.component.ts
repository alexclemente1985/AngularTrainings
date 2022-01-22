import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-rxjs-basic',
  templateUrl: './rxjs-basic.component.html',
  styleUrls: ['./rxjs-basic.component.scss']
})
export class RxjsBasicComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const myFirstObservable = new Observable(
      (observer: Observer<number>)=>{
        observer.next(1);
        observer.next(2);
        observer.next(3);
        observer.next(4);
        observer.next(5);
        observer.error("HERE comes the error 6");
        observer.complete();
      }
    );
    myFirstObservable.subscribe((n: number)=>{
      console.log('number ->',n);
    },(e)=>console.log(e),()=>console.log('completed!'))
  }

}
