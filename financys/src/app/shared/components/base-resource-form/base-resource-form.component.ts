import { BaseResourceService } from 'src/app/shared/services/base-resource/base-resource.service';
import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { AfterContentChecked,  OnInit, Injector, Inject, Directive } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs';

@Directive()
export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

  currentAction!: string;
  resourceForm!: FormGroup
  pageTitle!: string;
  serverErrorMessages: string[] | null = null;
  submittingForm: boolean = false;

  protected fb: FormBuilder;
  protected router: Router;
  protected route: ActivatedRoute;

  constructor(
    protected injector: Injector,
    @Inject(BaseResourceModel) public resource: T,
    protected resourceService: BaseResourceService<T>,
    protected jsonDataToResourceFn: (jsonData: any) => T,
    protected toastr: ToastrService
  ) {
    this.route = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.fb = this.injector.get(FormBuilder);
   }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildResourceForm();
    this.loadResource();
  }

  ngAfterContentChecked(): void {
      this.setPageTitle();
  }

  submitForm(){
    this.submittingForm = true;

    if(this.currentAction == "new"){
      this.createResource();
    }
    else {
      this.updateResource();
    }
  }

  protected createResource(){
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
    this.resourceService.create(resource)
    .subscribe({
      next: (resource) => this.actionsForSuccess(resource),
      error: (e) => this.actionsForError(e)
    })
  }

  protected updateResource(){
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
    this.resourceService.update(resource)
    .subscribe({
      next: (resource) => this.actionsForSuccess(resource),
      error: (e) => this.actionsForError(e)
    })
  }

  protected actionsForSuccess(resource: T){
    this.toastr.success("Solicitação processada com sucesso!");

    //redireciona para rota "pai"
    const baseComponentPath: string = this.route.snapshot.parent?.url[0].path as string;

    this.router.navigateByUrl(baseComponentPath, {skipLocationChange: true})
    .then(
      () => this.router.navigate([baseComponentPath, resource.id, "edit"])
    )
  }

  protected actionsForError(error: any){
    this.toastr.error("Ocorreu um erro ao processar a sua solicitação!");

    this.submittingForm = false;

    if(error.status === 422){
      this.serverErrorMessages = JSON.parse(error._body).errors;
    }
    else {
      this.serverErrorMessages = ["Falha na comunicação com o servidor. Por favor, teste mais tarde."]
    }
  }

  protected setCurrentAction(){
    if(this.route.snapshot.url[0].path === "new"){
      this.currentAction = "new";
    }
    else{
      this.currentAction = "edit";
    }

  }

  protected loadResource(){
    if(this.currentAction === "edit"){
      this.route.paramMap
      .pipe(
        switchMap(params => this.resourceService.getById(+(params.get('id') as string)))
      )
      .subscribe({
        next: (resource) => {
          this.resource = resource;
          this.resourceForm.patchValue(resource) // binds loaded data to ResourceForm
        },
        error: (e) => console.log("Ocorreu um erro no servidor: ",e)
      })
    }
  }

  protected setPageTitle(){
    if(this.currentAction == "new"){
      this.pageTitle = this.creationPageTitle();
    }
    else{
      this.pageTitle = this.editionPageTitle();
    }
  }

  protected creationPageTitle(): string{
    return "Novo";
  }

  protected editionPageTitle(): string{
    return "Edição";
  }

  protected abstract buildResourceForm(): void;

}
