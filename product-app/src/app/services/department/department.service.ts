import { Injectable } from '@angular/core';
import { Department } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private departments: Department[] = [
    {id: 1, name: "Clothing"},
    {id: 2, name: "Books"},
    {id: 3, name: "Electronics"},
    {id: 4, name: "Computers"},
  ];

  private nextID: number = this.departments.length + 1;

  constructor() { }

  getDepartments(): Department[]{
    return this.departments;
  }

  addDepartment(d: Department): void{
    this.departments.push({...d, id: this.nextID++});
    console.log(this.departments)
  }

  getDepartmentByID(id: number): Department {
    const d = this.departments.find(d => d.id == id);
    return d ? d : {} as Department;
  }
}
