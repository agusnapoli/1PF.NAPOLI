import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersService } from '../users.service';
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
        console.log('Loading users...'); // Debugging

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
          map(() => UsersActions.loadUsers()), // Recargar la lista después de eliminar
          catchError(error => of(UsersActions.loadUsersFailure({ error })))
        )
      )
    )
  );
}


  // Aquí puedes agregar efectos para agregar, actualizar y eliminar usuarios
