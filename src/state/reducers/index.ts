import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import { IUsers, IState } from "../index";
import { SET_USERS_LOADING, IUsersPayload, ISetUsersLoading, SET_USERS, ISetUsers, SET_USERS_ERROR, ISetUsersError } from "../actions";

export const usersReducer = handleActions<IUsers, IUsersPayload>({
    [SET_USERS_LOADING]: (state: IUsers, _: ISetUsersLoading) => {
        return {...state, loading: true};
    },
    [SET_USERS_ERROR]: (state: IUsers, action: ISetUsersError) => {
        if (action.payload) {
            return {...state, loading: false, error: action.payload}
        } else {
            return state;
        }
    },
    [SET_USERS]: (state: IUsers, action: ISetUsers) => {
        if (action.payload) {
            return { data: action.payload, loading: false, error: '' }
        } else {
            return state;
        }
    }
}, {loading: false, error: '', data: []});

export default combineReducers<IState>({
    users: usersReducer
})

