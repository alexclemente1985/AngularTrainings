import { createReducer, on } from '@ngrx/store'
import { IUser } from '../../interfaces/user.interface'
import { login, logout } from '../actions/auth-actions'

export const authFeatureKey = 'auth';

export interface IAuthState {
    user: IUser | null
}

export const initialAuthState: IAuthState = {
    user: null
}

export const authReducer = createReducer(
    initialAuthState,
    on(
        login,
        (state, action) => ({
            ...state,
            user: action.user
        })
    ),
    on(
        logout,
        (state, action) => ({
            ...state,
            user: initialAuthState.user
        })
    )
)