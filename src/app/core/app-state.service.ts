import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../shared/models/users.model';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private currentTitleSubject = new BehaviorSubject<string>('');
  currentUser$ = this.currentUserSubject.asObservable();
  currentTitle$ = this.currentTitleSubject.asObservable();

  setCurrentUser(user: User | null): void {
    this.currentUserSubject.next(user);
  }

  setCurrentTitle(title: string): void {
    this.currentTitleSubject.next(title);
  }
}
