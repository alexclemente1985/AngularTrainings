import { EntryService } from './../shared/services/entry.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AfterContentChecked, Component, OnInit } from '@angular/core';
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
export class EntryFormComponent implements OnInit, AfterContentChecked {

  entryForm!: FormGroup

  currentAction!: string;
  pageTitle!: string;
  serverErrorMessages: string[] | null = null;
  submittingForm: boolean = false;
  entry: Entry = new Entry();

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
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private entryService: EntryService,
    private toastr: ToastrService,
    private config: PrimeNGConfig,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildEntryForm();
    this.loadEntry();
    this.loadTypeOptions();
    this.loadCategories();
    this.config.setTranslation(ptLocale.primeng)

  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  ngOnDestroy(){
    this.categoriesSubscription$.unsubscribe();
  }

  submitForm(){
    this.submittingForm = true;

    if(this.currentAction == "new"){
      this.createEntry();
    }
    else {
      this.updateEntry();
    }
  }

  private loadCategories(){
    this.categoriesSubscription$ = this.categoryService.getAll()
    .subscribe(
      {
        next: (cat: Category[]) => this.categories = cat,
        error: (e) => console.log(e)
      }
    )
  }

  private loadTypeOptions(){
    this.typeOptions = this.getTypeOptions()
  }

  private getTypeOptions(): Array<any> {
    return Object.entries(Entry.types).map(
      ([value, text]) =>{
        return {text: text,value: value}
      }
    )
  }

  private loadEntry(){
    if(this.currentAction === "edit"){
      this.route.paramMap
      .pipe(
        switchMap(params => this.entryService.getById(+(params.get('id') as string)))
      )
      .subscribe({
        next: (entry) => {
          this.entry = entry;
          this.entryForm.patchValue(entry) // binds loaded data to EntryForm
        },
        error: (e) => console.log("Ocorreu um erro no servidor: ",e)
      })
    }
  }

  private buildEntryForm(){
    this.entryForm = this.fb.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(3)]],
      description: [null],
      type: ['expense',[Validators.required]],
      amount: [null,[Validators.required]],
      date: [null,[Validators.required]],
      paid: [true,[Validators.required]],
      categoryId: [null,[Validators.required]]
    })
  }

  private setCurrentAction(){
    if(this.route.snapshot.url[0].path === "new"){
      this.currentAction = "new";
    }
    else{
      this.currentAction = "edit";
    }
  }

  private createEntry(){
    const entry: Entry = Entry.fromJson(this.entryForm.value);
    this.entryService.create(entry)
    .subscribe({
      next: (entry) => this.actionsForSuccess(entry),
      error: (e) => this.actionsForError(e)
    })
  }

  private updateEntry(){
    const entry: Entry = Entry.fromJson(this.entryForm.value);
    this.entryService.update(entry)
    .subscribe({
      next: (entry) => this.actionsForSuccess(entry),
      error: (e) => this.actionsForError(e)
    })
  }

  private actionsForSuccess(entry: Entry){
    this.toastr.success("Solicitação processada com sucesso!");

    // redirect/reload component page
    this.router.navigateByUrl("categories", {skipLocationChange: true})
    .then(
      () => this.router.navigate(['entries', entry.id, "edit"])
    )
  }

  private actionsForError(error:any){
    this.toastr.error("Ocorreu um erro ao processar a sua solicitação!");

    this.submittingForm = false;

    if(error.status === 422){
      this.serverErrorMessages = JSON.parse(error._body).errors;
    }
    else {
      this.serverErrorMessages = ["Falha na comunicação com o servidor. Por favor, teste mais tarde."]
    }
  }

  private setPageTitle(){
    if(this.currentAction == "new"){
      this.pageTitle = "Cadastro de Novo Lançamento"
    }
    else{
      const entryName = this.entry.name || "";
      this.pageTitle = "Editando Lançamento: " + entryName;
    }
  }


}
