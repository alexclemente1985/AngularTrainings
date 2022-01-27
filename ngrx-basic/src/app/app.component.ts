import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from './models/person';
import * as faker from '@faker-js/faker';
import { select, Store } from '@ngrx/store';
import { AppState } from './store/person';
import { PersonAll, PersonDelete, PersonNew, PersonUpdate } from './store/person/actions';
import { PeopleState } from './store/person/reducer';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngrx-basic';

  people$!: Observable<PeopleState[]>;

  constructor(private store: Store<AppState>){}

  ngOnInit(): void{
    this.store.dispatch(new PersonAll());
    this.people$ = this.store.pipe(select('people'))
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
    console.log('changeando ', p, p.name)

    p.name = faker.faker.name.findName();
    p.address = faker.faker.address.streetAddress();
    p.city = faker.faker.address.city();
    p.country = faker.faker.address.country();
    p.age = Math.round(Math.random()*100);
    p._id = new Date().getMilliseconds().toString();


    this.store.dispatch(new PersonUpdate({person: p}))
  }
}
