import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-form-validation',
  templateUrl: './reactive-form-validation.component.html',
  styleUrls: ['./reactive-form-validation.component.scss']
})
export class ReactiveFormValidationComponent implements OnInit {
  
  clientForm = this.fb.group({
    firstName: ['',[Validators.required, Validators.minLength(5)]],
    lastName: ['',[Validators.required]],
    birth: [new Date(),[Validators.required]],
    age: [0,[Validators.required, Validators.max(150), Validators.min(0)]],
    email: ['',[Validators.required, Validators.email]],
    street: ['',[Validators.required]],
    city: ['',[Validators.required]],
    state: ['',[Validators.required]],
    phone1: ['',[Validators.required]],
    phone2: [''], 
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.clientForm.value);
  }

}
