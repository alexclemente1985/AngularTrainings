import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, fromEvent, of, map, mergeAll, mergeMap, debounceTime, switchMap, switchAll, tap, timer, BehaviorSubject, Subject, from, take, takeUntil, finalize, Subscription } from 'rxjs';
import { Person } from 'src/app/models/Person.model';

@Component({
  selector: 'app-switch-merge',
  templateUrl: './switch-merge.component.html',
  styleUrls: ['./switch-merge.component.scss']
})
export class SwitchMergeComponent implements OnInit {
  @ViewChild('searchBy') el!: ElementRef;
  searchInput: string = '';
  //people$!: Observable<Person[]>;

  searchObservable$!: Observable<string>;

  unsubscribe = new Subject<boolean>();

  people: Person[] = [];

  private readonly url: string = 'http://localhost:3000/person';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {}

  ngAfterViewChecked(){
    this.searchObservable$= fromEvent(this.el.nativeElement, 'keyup')

    // this.firstOption();
    //this.secondOption();
    this.thirdOption();
  }

  filterPeople(searchInput: string): Observable<Person[]>{
    if(searchInput.length === 0){
      return of([]);
    }
    return this.http.get<Person[]>(`${this.url}/${searchInput}`);
  }


   secondOption() {
   // let keyup$ = fromEvent(this.el.nativeElement, 'keyup'); 

    /*
    let fetch$ = keyup$.pipe(map( (e) => this.filterPeople(this.searchInput))) ;
    fetch$
      .pipe(mergeAll())
      .subscribe((data) => console.log(data));
    this.people$ = fetch$.pipe(mergeAll());
    */

    this.searchObservable$
      .pipe(
          take(10),
          takeUntil(this.unsubscribe),
          debounceTime(700),
          mergeMap(
            ()=> this.filterPeople(this.searchInput)))
      .subscribe((p) => {
          this.people = p;
          //sem esse unsubscribe, requests não terminam nunca depois de alguns filtros
          this.unsubscribe.next(true)
        })
      
   
  }

  thirdOption() {
    //let keyup$ = fromEvent(this.el.nativeElement, 'keyup'); 
    /*
    this.people$ = keyup$
      .pipe(map( (e) => this.filterPeople(this.searchInput)))
      .pipe(switchAll());
    */
   /* this.people$ = keyup$
    .pipe(
      debounceTime(700),
      switchMap(()=>  this.filterPeople(this.searchInput)))
 */
    this.searchObservable$.pipe(
      takeUntil(this.unsubscribe),
      debounceTime(2000),
      switchMap(()=> this.filterPeople(this.searchInput))
    )
    .subscribe((p)=> {
      this.people = p;
      this.unsubscribe.next(true);
    })
  }
 
}
