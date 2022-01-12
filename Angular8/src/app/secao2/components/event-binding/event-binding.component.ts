import { Component, OnInit } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-event-binding',
  templateUrl: './event-binding.component.html',
  styleUrls: ['./event-binding.component.scss']
})
export class EventBindingComponent implements OnInit {
  buttonName = "My button";
  spinnerMode: ProgressSpinnerMode = "determinate";
  btnEnable: boolean = true;
  selectDisabled: boolean = false;
  selectedOption: string =  '';
  inputName = "John Doe";
  i=0;
  constructor() { }

  ngOnInit(): void {
  }

  save(){
    console.log("click")
  }

  inc(){
    this.i++;
    this.buttonName = "It was clicked " + this.i + " times";
  }

  disable(){
    this.btnEnable = false;
    this.spinnerMode = "indeterminate";
    setTimeout(()=>{
      this.btnEnable = true;
      this.spinnerMode = "determinate";
    },3000)
  }

  cbChange(event: any){
    console.log(event)
    this.selectDisabled = !this.selectDisabled;
  }

  selectionChange(event:  any){
    console.log(event);
    this.selectedOption = event.value
  }

  inputEvent(event: any){
    this.inputName = event.target.value;
  }

}
