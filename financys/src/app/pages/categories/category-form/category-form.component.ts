import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
//import toastr from 'toastr';
import { Category } from '../shared/models/category.model';
import { CategoryService } from '../shared/services/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {

  currentAction!: string;
  categoryForm!: FormGroup
  pageTitle!: string;
  serverErrorMessages: string[] | null = null;
  submittingForm: boolean = false;
  category: Category = new Category();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();
  }

  ngAfterContentChecked(): void {
      this.setPageTitle();
  }

  private setCurrentAction(){
    if(this.route.snapshot.url[0].path === "new"){
      this.currentAction = "new";
    }
    else{
      this.currentAction = "edit";
    }
  }

  private buildCategoryForm(){
    this.categoryForm = this.fb.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null]
    })
  }

  private loadCategory(){
    if(this.currentAction === "edit"){
      this.route.paramMap
      .pipe(
        switchMap(params => this.categoryService.getById(+(params.get('id') as string)))
      )
      .subscribe({
        next: (category) => {
          this.category = category;
          this.categoryForm.patchValue(category) // binds loaded datat to CategoryForm
        },
        error: (e) => console.log("Ocorreu um erro no servidor: ",e)
      })
    }
  }

  private setPageTitle(){
    if(this.currentAction == "new"){
      this.pageTitle = "Cadastro de Nova Categoria"
    }
    else{
      const categoryName = this.category.name || "";
      this.pageTitle = "Editando Categoria: " + categoryName;
    }
  }

}
