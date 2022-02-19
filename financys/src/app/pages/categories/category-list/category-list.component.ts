import { ActionButton } from './../../../shared/interfaces/action-button';
import { Component, OnInit } from '@angular/core';
import { catchError, filter, switchMap, throwError } from 'rxjs';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { BreadCrumbItem } from 'src/app/shared/interfaces/bread-crumb-item';
import { Category } from '../shared/models/category.model';
import { CategoryService } from '../shared/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent extends BaseResourceListComponent<Category> {

  resourceBreadCrumb: BreadCrumbItem;
  actionButtonConfig: ActionButton;

  constructor(
    private categoryService: CategoryService
  ) {
    super(categoryService);
    this.resourceBreadCrumb = Category.breadCrumbTypes;
    this.actionButtonConfig = Category.actionButtonConfig;
   }
}
