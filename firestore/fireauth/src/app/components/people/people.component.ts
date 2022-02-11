import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from 'src/app/models/Person';
import { PeopleService } from 'src/app/services';
import * as Fkr from '@faker-js/faker';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  people$!: Observable<Person[]>;

  constructor(
    private peopleService: PeopleService
  ) { }

  ngOnInit(): void {
    this.people$ = this.peopleService.getPeople();
  }

  addOne(){
    const p: Person = {
      name: Fkr.faker.name.findName(),
      age: Fkr.faker.random.number({min: 18, max: 90}),
      country: Fkr.faker.address.country(),
      email: Fkr.faker.internet.email(),
      company: Fkr.faker.company.companyName()
    };

    this.peopleService.addPerson(p);
  }

  generate(){
    for(let i = 0; i < 5; i++){
      this.addOne();
    }
  }

}
