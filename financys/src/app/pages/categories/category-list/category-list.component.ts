import { Component, OnInit } from '@angular/core';
import { catchError, filter, switchMap, throwError } from 'rxjs';
import { Category } from '../shared/models/category.model';
import { CategoryService } from '../shared/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.categoryService.getAll()
    .subscribe({
      next: (categories) => this.categories = categories,
      error: () => alert("Erro ao carregar a lista")
    })
  }

  deleteCategory(category: Category){
    const mustDelete = confirm("Deseja realmente excluir este item?");
    
    if(mustDelete){
      console.log('caiu no delete')
      this.categoryService.delete(category.id as number)
      .subscribe({
        next: () => this.categories = this.categories.filter(element => element != category),
        error: (e) => alert("Erro ao tentar excluir")
      })
    }
    
    

  }

}
