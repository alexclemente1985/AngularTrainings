import { Component, OnInit } from '@angular/core';
import { Department } from '../interfaces';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  depName: string = "";
  departments: Department[] = [
    {name: "dep 1", _id:"ljsdfjdsljf"},
    {name: "dep 2", _id:"ljsdfjdsljf"},
    {name: "dep 3", _id:"ljsdfjdsljf"},
    {name: "dep 4", _id:"ljsdfjdsljf"},
    {name: "dep 5", _id:"ljsdfjdsljf"},
  ];
  constructor() { }

  ngOnInit(): void {
  }

  save(){}
  cancel(){}
  delete(dep: Department){}
  edit(dep: Department){}

}
