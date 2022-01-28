import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from './models/person';
import * as faker from '@faker-js/faker';
import { select, Store } from '@ngrx/store';
import { AppState } from './store';
import { PersonAll, PersonDelete, PersonNew, PersonUpdate } from './store/person/actions';
import { PeopleState } from './store/person/reducer';
import * as fromPersonSelectors from './store/person//selectors'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngrx-basic';

  people$!: Observable<Person[]>

  constructor(private store: Store<AppState>){}

  ngOnInit(): void{
    this.store.dispatch(new PersonAll());
    //this.people$ = this.store.pipe(select('people'));

    //this.people$ = this.store.select(selectPeople);
    this.people$ = this.store.select(fromPersonSelectors.selectAll)

    /* this.store.select(selectPeopleCount)
      .subscribe(n =>console.log('n ',n)) */
  }

  addNew(){
    let person: Person = {
      name: faker.faker.name.findName(),
      address: faker.faker.address.streetAddress(),
      city: faker.faker.address.city(),
      country: faker.faker.address.country(),
      age: Math.round(Math.random()*100),
      _id: new Date().getMilliseconds().toString()
    }

    this.store.dispatch(new PersonNew({person}));
  }

  delete(p: Person){
    this.store.dispatch(new PersonDelete({id: p._id as string}))
  }

  update(p: Person){
    let person = {...p};

    person.name = faker.faker.name.findName();
    person.address = faker.faker.address.streetAddress();
    person.city = faker.faker.address.city();
    person.country = faker.faker.address.country();
    person.age = Math.round(Math.random()*100);

    this.store.dispatch(new PersonUpdate({id: person._id as string, changes: person}));
  }
}
