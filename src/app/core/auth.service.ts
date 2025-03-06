import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../shared/models/users.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUser$ = new BehaviorSubject<User | null>(null);

  constructor(
    private router: Router,
    private apiService: ApiService
  ) {
    this.initializeAuth(); // 🔹 Ejecutar al iniciar el servicio
  }

  login(email: string, password: string): Observable<User> {
    return new Observable(observer => {
      this.apiService.get<User[]>('users').subscribe(users => {
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
          this.setAuthUser(user);
          observer.next(user);
          observer.complete();
        } else {
          observer.error('Credenciales incorrectas');
        }
      });
    });
  }

  logout(): void {
    this.authUser$.next(null);
    localStorage.removeItem('authUser');
    localStorage.removeItem('authToken');
    this.router.navigate(['/auth']);
  }

  verifyToken(): Observable<User> {
    return new Observable(observer => {
      const user = JSON.parse(localStorage.getItem('authUser') || 'null');
      const token = localStorage.getItem('authToken');

      if (user && token && user.token === token) {
        this.apiService.get<User[]>('users').subscribe(users => {
          const validUser = users.find(u => u.id === user.id);
          if (validUser) {
            observer.next(user);
            observer.complete();
          } else {
            observer.error('Usuario no encontrado');
          }
        });
      } else {
        observer.error('Token inválido');
      }
    });
  }

  isAdmin(): boolean {
    return this.authUser$.value?.role === 'admin';
  }

  isEmployee(): boolean {
    return this.authUser$.value?.role === 'employee';
  }

  getCurrentRole(): 'admin' | 'employee' | null {
    return this.authUser$.value?.role || null;
  }

  isAuthenticated(): boolean {
    return !!this.authUser$.value;
  }

  getAuthUser(): Observable<User | null> {
    return this.authUser$.asObservable();
  }

  setAuthUser(user: User): void {
    this.authUser$.next(user);
    localStorage.setItem('authUser', JSON.stringify(user));
    localStorage.setItem('authToken', user.token || '');
  }

  initializeAuth(): void {
    const user = localStorage.getItem('authUser');
    const token = localStorage.getItem('authToken');

    if (user && token) {
      const parsedUser = JSON.parse(user);

      if (parsedUser.token === token) {
        this.authUser$.next(parsedUser); // 🔹 Restaurar sesión
      } else {
        this.logout();
      }
    }
  }
}
