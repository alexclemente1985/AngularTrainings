import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Department } from '../interfaces';
import { DepartmentService } from '../services/department/department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  depName: string = "";
  departments: Department[] = [];
  private unsubscribe$: Subject<any> = new Subject();

  depEdit: Department = null as unknown as Department;
  constructor(
    private departmentService: DepartmentService,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.departmentService.get()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((deps)=> this.departments = deps);
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
  }

  save(){
    if(this.depEdit){
      this.departmentService.update({name: this.depName, _id: this.depEdit._id})
      .subscribe(
        (dep)=>{
          this.notify('Updated!');
        },
        (err)=>{
          this.notify('Error');
          console.log(err);
        }
      )
    } else {
      this.departmentService.add({name: this.depName})
      .subscribe(
        (dep)=>{
          this.clearFields();
          this.notify('Inserted!');
          console.log(dep)
        },
        (err)=>{
          this.notify('Error');
          console.log(err)
        }
      )
    }
  }

  cancel(){
    this.clearFields();
  }
  delete(dep: Department){
    this.departmentService.del(dep)
    .subscribe(
      ()=>this.notify('Removed!'),
      (err)=>console.log(err)
    )
  }
  edit(dep: Department){
    this.depName = dep.name;
    this.depEdit = dep;
  }

  clearFields(){
    this.depName = '';
    this.depEdit = null as unknown as Department;
  }

  notify(msg: string){
    this.snackBar.open(msg, "OK",{duration: 3000});
  }


}
