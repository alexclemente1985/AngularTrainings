import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})

export class BookDetailComponent implements OnInit {

  book$!: Observable<Book | null>;
  index!: number;
  authors: string[] | undefined;
  bookSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router) { }

  ngOnInit() {
    console.log('Index: ', this.route.snapshot.paramMap.get('index'));

    this.book$ = this.route.paramMap
    .pipe(
      tap({
        next: (params: ParamMap) =>
        this.index = parseInt(params.get('index') as string),
        error: (err) => console.error(err)
      }),
      switchMap((params: ParamMap) => this.bookService.get(this.index)),
      tap({
        next: (b) => this.authors = (b) ? b.authors : [],
        error: (err) => console.error(err)
      })
    )

    //this.bookSubscription = this.route.paramMap

    /* .pipe(
      map((params: ParamMap)=> this.index = parseInt(params.get('index') as string))
    ) */

    /* .subscribe((params: ParamMap)=>{
      this.index = parseInt(params.get('index') as string);
      if(this.index){
        this.book$ = this.bookService.get(this.index);
      }
    }) */

      /* .pipe(
        filter((params: ParamMap)=> !!params.get('index')),
        tap((params: ParamMap) => this.index = +!params.get('index') as number),
        switchMap((params: ParamMap) => this.bookService.get( +!params.get('index') )),
        tap((b) => this.authors = (b) ? b.authors: [] )); */

      //.subscribe((params: ParamMap) => console.log("Index: ", params.get('index')))
  }

  remove() {
    this.bookService.remove(this.index);
    this.router.navigateByUrl("books");
  }

  goAuthors() {
    let url = '/books/' + this.index + '/authors';
    this.router.navigate([url, {authors: this.authors}])
  }

  ngOnDestroy(){
    if(this.bookSubscription){
      this.bookSubscription.unsubscribe()
    }
  }

}
