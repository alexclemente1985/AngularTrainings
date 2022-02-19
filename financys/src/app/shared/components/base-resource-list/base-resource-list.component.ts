import { BaseResourceService } from 'src/app/shared/services/base-resource/base-resource.service';
import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { Component, OnInit, Directive } from '@angular/core';

@Directive()
export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

  resources: T[] = [];

  constructor(
    private resourceService: BaseResourceService<T>
  ) { }

  ngOnInit(): void {
    this.resourceService.getAll()
    .subscribe({
      next: (resources) => this.resources = resources.sort((a,b)=> (b.id as number) - (a.id as number)),
      error: () => alert("Erro ao carregar a lista")
    })
  }

  deleteResource(resource: T){
    const mustDelete = confirm("Deseja realmente excluir este item?");

    if(mustDelete){
      this.resourceService.delete(resource.id as number)
      .subscribe({
        next: () => this.resources = this.resources.filter(element => element != resource),
        error: (e) => alert("Erro ao tentar excluir")
      })
    }
  }
}
