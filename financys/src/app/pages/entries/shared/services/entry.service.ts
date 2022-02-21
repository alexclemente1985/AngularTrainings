import { Injector, Injectable } from '@angular/core';
import { CategoryService } from 'src/app/pages/categories/shared/services/category.service';
import { Entry } from '../models/entry.model';
import { BaseResourceService } from 'src/app/shared/services/base-resource/base-resource.service';
import { mergeMap, Observable, ObservableInput, catchError, map } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry>{

  constructor(
    protected override injector: Injector,
    private categoryService: CategoryService
  ) {
    super("api/entries", injector, Entry.fromJson)
   }

  override create(entry: Entry): Observable<Entry>{
    return this.setCategoryAndSendToServer(entry, super.create.bind(this));
  }

  override update(entry: Entry): Observable<Entry>{
    return this.setCategoryAndSendToServer(entry, super.update.bind(this));
   }

  private setCategoryAndSendToServer(entry: Entry, sendFn: any): Observable<Entry>{
    return this.categoryService.getById(entry.categoryId as number)
    .pipe(
      mergeMap((category): ObservableInput<any> =>{
        entry.category = category;
        return sendFn(entry);
      }),
      catchError(this.handleError)
    )
  }

  getByMonthAndYear(month: number, year: number): Observable<Entry[]>{
    return this.getAll()
    .pipe(
      map(entries => this.filterByMonthAndYear(entries, month, year))
    )
  }

  private filterByMonthAndYear(entries: Entry[], month: number, year: number){
    return entries.filter(entry => {
        const entryDate = moment(entry.date, "DD/MM/YYYY");
        const monthMatches = entryDate.month() + 1 == month;
        const yearMatches = entryDate.year() == year;

        if(monthMatches && yearMatches){
          return entry;
        }
      }
    )
  }
}
