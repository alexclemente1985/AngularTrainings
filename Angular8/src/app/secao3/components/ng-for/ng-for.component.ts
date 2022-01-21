import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ng-for',
  templateUrl: './ng-for.component.html',
  styleUrls: ['./ng-for.component.scss']
})
export class NgForComponent implements OnInit {
names = ['Alex','Pri','Caio','Jonas'];
cities = [
  {name: 'São Paulo', state: "SP"},
  {name: 'Rio de Janeiro', state: "RJ"},
  {name: 'Curitiba', state: "PR"},
  {name: 'Porto Alegre', state: "RS"},
]
  constructor() { }

  ngOnInit(): void {
  }

}
