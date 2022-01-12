import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-two-way-data-binding',
  templateUrl: './two-way-data-binding.component.html',
  styleUrls: ['./two-way-data-binding.component.scss']
})
export class TwoWayDataBindingComponent implements OnInit {
  name1 = 'John';
  name2 = 'Doe';

  client = {
    firstName: "Josh",
    lastName: "Doe",
    age: 20,
    address: "Paris"
  }
  constructor() { }

  ngOnInit(): void {
  }

}
