import { Injector, Injectable } from '@angular/core';
import { CategoryService } from 'src/app/pages/categories/shared/services/category.service';
import { Entry } from '../models/entry.model';
import { BaseResourceService } from 'src/app/shared/services/base-resource/base-resource.service';
import { mergeMap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry>{

  constructor(
    protected override injector: Injector,
    private categoryService: CategoryService
  ) {
    super("api/entries",injector, Entry.fromJson)
   }

  override create(entry: Entry): Observable<Entry>{
   return this.categoryService.getById(entry.categoryId as number)
    .pipe(
      //permite o retorno de Observable<Entry> e não Observable<Observable<Entry>>)
      mergeMap(category => {
        entry.category = category;
        // Reaproveita BaseResourceService no método homônimo
        return super.create(entry);
      })
    )
  }

  override update(entry: Entry): Observable<Entry>{
    return this.categoryService.getById(entry.categoryId as number)
    .pipe(
      mergeMap(category =>{
        entry.category = category;
        return super.update(entry);
      })
    )
  }
}
