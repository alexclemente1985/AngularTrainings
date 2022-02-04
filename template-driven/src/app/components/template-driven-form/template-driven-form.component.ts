import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Client } from "../../models"

@Component({
  selector: 'app-template-driven-form',
  templateUrl: './template-driven-form.component.html',
  styleUrls: ['./template-driven-form.component.scss']
})
export class TemplateDrivenFormComponent implements OnInit {

  client: Client = {
    firstName: "", 
    lastName: "", 
    birth: new Date(), 
    gender: "", 
    street: "",
    city: "", 
    state: "", 
    phone1: "", 
    phone2: ""
  }

  states = ['SP', 'RJ', 'SC', 'MG', 'PR', 'GO'];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.client)
  }

}
