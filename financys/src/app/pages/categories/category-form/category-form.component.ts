import { BreadCrumbItem } from './../../../shared/interfaces/bread-crumb-item';
import { AfterContentChecked, Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../shared/models/category.model';
import { CategoryService } from '../shared/services/category.service';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent extends BaseResourceFormComponent<Category> {

  category: Category = new Category();
  resourceBreadCrumb!: BreadCrumbItem;

  constructor(
    protected categoryService: CategoryService,
    protected override toastr: ToastrService,
    protected override injector: Injector
  ) {
    super(injector, new Category(), categoryService, Category.fromJson, toastr);
    this.resourceBreadCrumb = Category.breadCrumbTypes;
   }

  protected buildResourceForm(){
    this.resourceForm = this.fb.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(3)]],
      description: [null]
    })
  }

  protected override creationPageTitle(): string {
    return "Cadastro de Nova Categoria";
  }

  protected override editionPageTitle(): string {
      const categoryName = this.resource.name || "";
      return "Editando Categoria: " + categoryName;
  }
}
