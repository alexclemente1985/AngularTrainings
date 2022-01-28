import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Person } from 'src/app/models/person';
import * as fromPersonActions from './actions';
import { PersonActionTypes } from './types';

export interface PeopleState extends EntityState<Person>{}

export const peopleAdapter: EntityAdapter<Person> = createEntityAdapter<Person>({
  selectId: (p: Person) => p._id as string
})
export const initialState: PeopleState = peopleAdapter.getInitialState({});

export function reducer(state = initialState, action: fromPersonActions.PersonActions){
  switch(action.type){
    case PersonActionTypes.PERSON_NEW:
      return peopleAdapter.addOne(action.payload.person,state);
    case PersonActionTypes.PERSON_DELETE:
      return peopleAdapter.removeOne(action.payload.id, state);
    case PersonActionTypes.PERSON_UPDATE:
      return peopleAdapter.updateOne({id: action.payload.id, changes: action.payload.changes},state)
    default:
      return state;
  }
}
