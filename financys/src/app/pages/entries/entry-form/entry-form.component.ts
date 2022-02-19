import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { EntryService } from './../shared/services/entry.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AfterContentChecked, Component, Inject, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../categories/shared/services/category.service';
import { ToastrService } from 'ngx-toastr';
import { Entry } from '../shared/models/entry.model';
import { switchMap, Observable, Subject, Subscription } from 'rxjs';
import { PrimeNGConfig } from 'primeng/api';
import ptLocale from '../../../config/locales/pt';
import { Category } from '../../categories/shared/models/category.model';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.scss']
})
export class EntryFormComponent extends BaseResourceFormComponent<Entry> implements OnInit{


  typeOptions: Array<any> = []
  categories: Array<Category> = [];
  categoriesSubscription$!: Subscription;

  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ','
  };

  constructor(
    protected entryService: EntryService,
    protected override toastr: ToastrService,
    protected config: PrimeNGConfig,
    protected categoryService: CategoryService,
    protected override injector: Injector
  ) {
    super(injector, new Entry(), entryService, Entry.fromJson, toastr)
   }

  override ngOnInit(): void {
    this.loadCategories();
    this.loadTypeOptions();
    this.config.setTranslation(ptLocale.primeng);
    super.ngOnInit();
  }

  ngOnDestroy(){
    this.categoriesSubscription$.unsubscribe();
  }

  protected loadCategories(){
    this.categoriesSubscription$ = this.categoryService.getAll()
    .subscribe(
      {
        next: (cat: Category[]) => this.categories = cat,
        error: (e) => console.log(e)
      }
    )
  }

  protected override creationPageTitle(): string {
    return "Cadastro de Novo Lançamento";
  }

  protected override editionPageTitle(): string {
    const resourceName = this.resource.name || "";
    return "Editando Lançamento: " + resourceName;
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.fb.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
      type: ["expense", [Validators.required]],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      paid: [true, [Validators.required]],
      categoryId: [null, [Validators.required]]
    });
  }

  private getTypeOptions(): Array<any> {
    return Object.entries(Entry.types).map(
      ([value, text]) =>{
        return {text: text,value: value}
      }
    )
  }

  private loadTypeOptions(){
    this.typeOptions = this.getTypeOptions()
  }

}
