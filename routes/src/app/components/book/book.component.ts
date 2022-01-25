import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  books$!: Observable<Book[]>;

  constructor(
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.books$ = this.bookService.books$;
  }

}
