import { ActionReducerMap, createSelector } from "@ngrx/store";

import { reducer as PersonReducer, PeopleState} from './person/reducer';

export interface AppState {
  people: PeopleState;
}

export const appReducers: ActionReducerMap<AppState, any> = {
  people:  PersonReducer
}

//export const selectPeople = (state: AppState) => state.people;

/* export const selectPeopleCount = createSelector(
  selectPeople,
  (people) => people.length
); */

/* export const selectPeopleCount2 = createSelector(
  selectPeopleCount,
  selectPeople,
  (n,people) => n+1+people.length
) */
