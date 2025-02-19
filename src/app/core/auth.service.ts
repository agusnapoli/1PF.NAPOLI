import { Injectable } from '@angular/core';
import { LoginPayload } from '../auth/models';
import { BehaviorSubject, Observable, of } from 'rxjs'; // Asegúrate de importar `of`
import { User } from '../shared/models/users.model';
import { generateRandomString } from '../shared/utilities/utilities';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';


const FAKE_USERS_DB: User[] = [
  {
    id: generateRandomString(6),
    name: "Agustina",
    email: "email@gmail.com",
    password: "password",
    accessToken: "asdansj232daskdj",
    role: "ADMIN"
  },
  {
    id: generateRandomString(6),
    name: "Sol",
    email: "email2@gmail.com",
    password: "password",
    accessToken: "asdrejd455askdj",
    role: "EMPLOYEE"
  }
];

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authUser$ = new BehaviorSubject<null | User>(null);
  authUser$ = this._authUser$.asObservable();

  constructor(private router: Router) {}


  logout (): void
  {
     localStorage.removeItem('accessToken');
     this._authUser$.next(null);
     this.router.navigate(['auth']);
  }
  login(payload: LoginPayload): void {
    const loginResult = FAKE_USERS_DB.find(
      (user) => user.email === payload.email && user.password === payload.password
    );

    if (!loginResult) {
      alert("EMAIL O PASSWORD INVALIDOS");
      return;
    }

    localStorage.setItem('accessToken', loginResult.accessToken);
    this._authUser$.next(loginResult);
    this.router.navigate(['home']);
  }

  isAutenticated(): Observable<boolean> {
    const token = localStorage.getItem('accessToken');
    console.log('Verifying authentication, token:', token);

    if (!token) {
      console.log('No token found, user not authenticated');
      return of(false);
    }

    const storageUser = FAKE_USERS_DB.find(x => x.accessToken === token);
    console.log('User found in DB:', storageUser);

    this._authUser$.next(storageUser || null);
    return of(!!storageUser);
  }

}
