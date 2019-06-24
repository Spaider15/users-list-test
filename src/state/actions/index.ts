import { createAction, Action } from 'redux-actions';
import { IUser } from '../index';
import { Dispatch } from 'redux';
import User from '../../API/User';

export const SET_USERS_LOADING = 'SET_USERS_LOADING';
export const SET_USERS_ERROR = 'SET_USERS_ERROR';
export const SET_USERS = 'SET_USERS';
export const GET_USERS = 'GET_USERS';

export type IUsersPayload = IUser[] | string | boolean;

export type ISetUsersLoading = Action<boolean>;
export type ISetUsersError = Action<string>;
export type ISetUsers = Action<IUser[]>;

export function getUsers() {
    return async function (dispatch: Dispatch) {
        dispatch(setUsersLoading(true));
        try {
            const result = await User.getUsersList();
            dispatch(setUsers(result));
        } catch (e) {
            dispatch(setUsersError(e.message));
        }
    }
}

export const setUsersLoading = createAction<boolean>(SET_USERS_LOADING);
export const setUsersError = createAction<string>(SET_USERS_ERROR);
export const setUsers = createAction<IUser[]>(SET_USERS);
