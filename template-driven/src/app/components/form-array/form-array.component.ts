import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.scss']
})
export class FormArrayComponent implements OnInit {

  clientForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    address: this.fb.group({ 
      street: [''], 
      city: [''], 
      state: [''],
    }),
    phones: this.fb.array(['']), //this.fb.array(['','']), //caso queira iniciar com mais de um
    /* children: this.fb.group({
      name: [''],
      age: ['']
    }) */
    children: this.fb.array([])
  });

  phones = this.clientForm.get('phones') as FormArray;
  children = this.clientForm.get('children') as FormArray

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.phones.controls
  }

  submit(){
    console.log(this.clientForm.value);
  }

  addPhone(){
    this.phones.push(this.fb.control(['']));
  }

  addChildren(){
    this.children.push(
      this.fb.group({
        name: [''],
        age: ['']
      })
    )
  }

}
