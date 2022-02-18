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
    super("api/entries",injector)
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

  protected override jsonDataToResource(jsonData: any): Entry{
    return Object.assign(new Entry(), jsonData);
  }

  protected override jsonDataToResources(jsonData: any[]): Entry[]{
    const entries: Entry[] = [];
    jsonData.forEach(
      element => {
        //Permite que método get paidText do entry.service funcione
        const entry = Object.assign(new Entry(), element);
        entries.push(entry)
      }
    );
    return entries;
  }
}
