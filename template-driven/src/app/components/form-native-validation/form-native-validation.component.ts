import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-native-validation',
  templateUrl: './form-native-validation.component.html',
  styleUrls: ['./form-native-validation.component.scss']
})
export class FormNativeValidationComponent implements OnInit {

  firstName: string = '';
  lastName: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){

  }

}
