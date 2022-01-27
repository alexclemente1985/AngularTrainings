import { Person } from 'src/app/models/person';
import * as fromPersonActions from './actions';

export interface PeopleState{
  person: Person
}

export const initialState: PeopleState[] = [];

export function reducer(state: PeopleState[] = initialState, action: fromPersonActions.PersonActions): PeopleState[]{
  switch(action.type){
    /* case fromPersonActions.PersonActionTypes.PERSON_ALL:
      return state; */
    case fromPersonActions.PersonActionTypes.PERSON_DELETE:
      //return state.people.filter(p=> p._id != action.payload.id);
      return state.filter(p=>p.person._id != action.payload.id)
    case fromPersonActions.PersonActionTypes.PERSON_NEW:
      return state.concat([action.payload]);
    case fromPersonActions.PersonActionTypes.PERSON_UPDATE:
      let people = state.slice();
      let i = people.findIndex(p => p.person._id == action.payload.person._id);
      if(i>=0){
        people[i].person = action.payload.person;
      }
      return people;
    default:
      return state;
  }
}
