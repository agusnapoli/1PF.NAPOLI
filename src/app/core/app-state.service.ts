import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../shared/models/users.model';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private currentTitleSubject = new BehaviorSubject<string>('Administración'); // Título por defecto

  currentUser$ = this.currentUserSubject.asObservable();
  currentTitle$ = this.currentTitleSubject.asObservable();

  setCurrentUser(user: User | null): void { // Aceptar null como argumento
    this.currentUserSubject.next(user);
  }

  setCurrentTitle(title: string): void {
    this.currentTitleSubject.next(title);
  }
}
