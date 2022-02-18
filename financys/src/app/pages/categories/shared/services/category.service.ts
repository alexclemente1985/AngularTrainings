import { Injectable, Injector } from '@angular/core';
import constants from 'src/app/shared/constants';
import { BaseResourceService } from 'src/app/shared/services/base-resource/base-resource.service';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseResourceService<Category> {

  constructor(protected override injector: Injector) {
    super("api/categories", injector);
   }
}
