import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/users.model';
import * as UsersActions from './store/users.actions';
import { selectUsers } from './store/users.selectors';
import { AuthService } from '../../core/auth.service';
import { map } from 'rxjs';
import { startWith, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  standalone: false,
})
export class UsersComponent implements OnInit, OnDestroy {
  users$: Observable<User[]>;
  enrollmentForm: FormGroup;
  isEditing: boolean = false;
  isAdmin$: Observable<boolean> = of(false);
  currentUserId: string | null = null;

  constructor(private store: Store, private authService: AuthService, private fb: FormBuilder, private router: Router) {
    this.enrollmentForm = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
      role: ['employee']
    });
    this.users$ = this.store.select(selectUsers);
    this.isAdmin$ = this.authService.getAuthUser().pipe(
      map((user) => user?.role === 'admin'),
      startWith(false),
      catchError(() => of(false))
    );
  }

  ngOnInit(): void {
    this.store.dispatch(UsersActions.loadUsers());
  }

  ngOnDestroy(): void {
    this.store.dispatch(UsersActions.resetUsers());
  }

  createOrUpdateUser(): void {
    if (this.enrollmentForm.valid) {
      const userToSave: User = {
        id: this.currentUserId || this.generateId(),
        name: this.enrollmentForm.value.name,
        email: this.enrollmentForm.value.email,
        password: this.enrollmentForm.value.password,
        role: this.enrollmentForm.value.role,
      };

      if (this.currentUserId) {
        this.store.dispatch(UsersActions.updateUser({ user: userToSave }));
        this.resetForm();
      } else {
        this.store.dispatch(UsersActions.addUser({ user: userToSave }));
        this.resetForm();
      }
    }
  }

  updateUser(user: User): void {
    this.currentUserId = user.id;
    this.enrollmentForm.patchValue(user);
    this.isEditing = true;
  }

  viewUserDetails(id: string): void {
    this.router.navigate(['/users', id]);
  }

  deleteUser(id: string): void {
    this.store.dispatch(UsersActions.deleteUser({ id }));
  }

  resetForm(): void {
    this.enrollmentForm.reset({ role: 'employee' });
    this.currentUserId = null;
    this.isEditing = false;
  }

  generateId(): string {
    return Math.random().toString(36).substring(2, 15);
  }
}
