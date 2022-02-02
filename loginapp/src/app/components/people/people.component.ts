import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from 'src/app/models/person';
import { PersonService } from 'src/app/services';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  people$!: Observable<Person[]>;

  constructor(
    private personService: PersonService
  ) { }

  ngOnInit(): void {
    console.log('indo para rota people')
    this.people$ = this.personService.getPeople() as Observable<Person[]>;
  }
 
}
