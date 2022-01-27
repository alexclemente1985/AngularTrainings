import { ActionReducerMap } from "@ngrx/store";
import { Person } from "src/app/models/person";
//import * as fromPersonReducer from "./reducer";
import { reducer as PersonReducer, PeopleState} from './reducer';

export interface AppState {
  people: PeopleState[];
}

export const appReducers: ActionReducerMap<AppState, any> = {
  people:  PersonReducer//fromPersonReducer.reducer
}
