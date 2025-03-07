import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersService } from '../../../core/users.service';
import * as UsersActions from './users.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class UsersEffects {

   private actions$ = inject(Actions);
    private usersService = inject(UsersService);
  constructor() {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.loadUsers),
      mergeMap(() => {

        return this.usersService.getUsers().pipe(
          map(users => UsersActions.loadUsersSuccess({ users })),
          catchError(error => of(UsersActions.loadUsersFailure({ error })))
        );
      })
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.deleteUser),
      mergeMap(action =>
        this.usersService.deleteUser(action.id).pipe(
          map(() => UsersActions.loadUsers()),
          catchError(error => of(UsersActions.loadUsersFailure({ error })))
        )
      )
    )
  );

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.addUser),
      mergeMap(action =>
        this.usersService.addUser(action.user).pipe(
          map(() => UsersActions.loadUsers()),
          catchError(error => of(UsersActions.loadUsersFailure({ error })))
        )
      )
    )
  );




  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.updateUser),
      mergeMap(action =>
        this.usersService.updateUser(action.user).pipe(
          map(() => UsersActions.loadUsers()),
          catchError(error => of(UsersActions.loadUsersFailure({ error })))
        )
      )
    )
  );

}



