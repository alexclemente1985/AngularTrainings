import { createFeatureSelector, createSelector, State } from "@ngrx/store";
import { authFeatureKey, IAuthState } from "../reducers";

export const selectAuthState = createFeatureSelector<IAuthState>(authFeatureKey);

const isLoggedIn = (state: IAuthState) => !!state.user;
const isLoggedOut = (loggedIn: boolean) => !loggedIn;

export const isLoggedInSelector = createSelector(
    selectAuthState,
    isLoggedIn
);

export const isLoggedOutSelector = createSelector(
    isLoggedInSelector,
    isLoggedOut
)