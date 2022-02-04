import { Component, Input, OnInit } from '@angular/core';
import { DepartmentService } from 'src/app/services';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.scss']
})
export class DepartmentFormComponent implements OnInit {

  //@Input() depName: string | undefined;
  depName: string = '';
  constructor(private departmentService: DepartmentService) { }

  ngOnInit(): void {
  }

  save(){
    this.departmentService.addDepartment({name: this.depName});
    this.clear();
  }
  clear(){
    this.depName = "";
  }

}
