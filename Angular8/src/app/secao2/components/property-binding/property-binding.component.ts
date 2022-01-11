import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property-binding',
  templateUrl: './property-binding.component.html',
  styleUrls: ['./property-binding.component.scss']
})
export class PropertyBindingComponent implements OnInit {
  color: string = "accent";
  btnDisabled: boolean = false;
  colors: string[] = ['primary', 'accent', 'warn'];
  idx: number = 0;
  interval: any;
  constructor() { }

  ngOnInit(): void {
    this.interval = setInterval(()=>{
      this.idx = (this.idx + 1) % this.colors.length;
    }, 1000)

  }

  ngOnDestroy(){
    clearInterval(this.interval)
  }

}
