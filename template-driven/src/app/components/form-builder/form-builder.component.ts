import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit {

  /* clientForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormGroup({
      street: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl('')
    })
  }); */

  clientForm = this.fb.group({
    firstName: [''], //new FormControl(''), //Pode continuar sendo FormControl se quiser
    lastName: [''], //new FormControl(''),
    address: this.fb.group({ //new FormGroup({
      street: [''], //new FormControl(''),
      city: [''], //new FormControl(''),
      state: [''], //new FormControl('')
    })
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  submit(){
    console.log(this.clientForm.value);
  }

}
