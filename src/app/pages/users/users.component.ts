import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importar Router


import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from './models/user.model';
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
  enrollmentForm: FormGroup; // Definir el FormGroup
  isEditing: boolean = false; // Para manejar el estado de edición
  isAdmin$: Observable<boolean> = of(false); // Inicializar como un Observable vacío

  currentUserId: string | null = null; // Para manejar la edición

  constructor(private store: Store, private authService: AuthService, private fb: FormBuilder, private router: Router) {

    this.enrollmentForm = this.fb.group({ // Inicializar el FormGroup
      name: [''],
      email: [''],
      password: [''],
      role: ['employee']
    });
    this.users$ = this.store.select(selectUsers);
    this.isAdmin$ = this.authService.getAuthUser().pipe(
      map((user) => user?.role === 'admin'),
      startWith(false), // Valor inicial
      catchError(() => of(false)) // Manejo de errores
    );
  }

  ngOnInit(): void {
    this.store.dispatch(UsersActions.loadUsers());
  }

  ngOnDestroy(): void {
    // Aquí puedes agregar lógica para limpiar si es necesario
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
        console.log('Updating user:', userToSave);
        this.store.dispatch(UsersActions.updateUser({ user: userToSave }));
        this.resetForm();
      } else {
        console.log('Adding new user:', userToSave);
        this.store.dispatch(UsersActions.addUser({ user: userToSave }));
        this.resetForm();
      }
    }
  }

  updateUser(user: User): void {
    this.currentUserId = user.id;
    this.enrollmentForm.patchValue(user); // Cargar los datos del usuario en el formulario
    this.isEditing = true; // Establecer que se está editando
  }



  viewUserDetails(id: string): void {
    this.router.navigate(['/users', id]); // Navegar al componente de detalles de usuario
  }


  deleteUser(id: string): void {

    this.store.dispatch(UsersActions.deleteUser({ id }));
  }

  resetForm(): void {
    this.enrollmentForm.reset({ role: 'employee' }); // Resetear el formulario
    this.currentUserId = null;
    this.isEditing = false; // Limpiar el estado de edición
  }

  generateId(): string {
    return Math.random().toString(36).substring(2, 15);
  }
}
