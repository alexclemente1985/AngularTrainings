import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-string-interpolation',
  templateUrl: './string-interpolation.component.html',
  styleUrls: ['./string-interpolation.component.scss']
})
export class StringInterpolationComponent implements OnInit {
  firstName = 'Alexandre';
  person = {
    firstName: 'Caio',
    lastName: 'Pinheiro',
    age: 14,
    address: 'Rua Alfredo Azamor'
  }

  constructor() { }

  ngOnInit(): void {
  }

}
