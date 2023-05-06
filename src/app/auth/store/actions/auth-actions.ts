import { createAction, props } from '@ngrx/store';
import { IUser } from '../../interfaces/user.interface';
import { AuthTypes } from '../types/auth-types';

export const login = createAction(
    AuthTypes.LOGIN,
    props<{user: IUser}>()
);

export const logout = createAction(
    AuthTypes.LOGOUT
)