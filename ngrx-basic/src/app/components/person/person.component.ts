import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Person } from 'src/app/models/person';
import { PeopleState } from 'src/app/store/person/reducer';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  @Input() personObject!: PeopleState/* Person */;
  @Output() delete: EventEmitter<Person> = new EventEmitter<Person>();
  @Output() update: EventEmitter<Person> = new EventEmitter<Person>();

  constructor() { }

  ngOnInit(): void {
  }

}
