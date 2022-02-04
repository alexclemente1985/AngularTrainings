import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models';

@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.scss']
})
export class FormValidationComponent implements OnInit {

  client: Client = {
    firstName: '',
    lastName: '',
    gender: '',
    age: 0,
    email: '',
    birth: new Date(),
    street: '',
    city: '',
    state: '',
    phone1: '',
    phone2: ''
  };

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){}

}
