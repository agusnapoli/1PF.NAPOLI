import { createReducer, on } from '@ngrx/store';
import { User } from '../models/user.model';
import * as UsersActions from './users.actions';

export interface UsersState {
  users: User[];
  error: string | null;
}

export const initialState: UsersState = {
  users: [],
  error: null
};

export const usersReducer = createReducer(
  initialState,
  on(UsersActions.loadUsersSuccess, (state, { users }) => ({ ...state, users })),
  on(UsersActions.loadUsersFailure, (state, { error }) => ({ ...state, error })),
  on(UsersActions.addUser, (state, { user }) => ({ ...state, users: [...state.users, user] })),
  on(UsersActions.updateUser, (state, { user }) => ({
    ...state,
    users: state.users.map(u => (u.id === user.id ? user : u))
  })),
  on(UsersActions.deleteUser, (state, { id }) => ({
    ...state,
    users: state.users.filter(u => u.id !== id)
  }))
);
