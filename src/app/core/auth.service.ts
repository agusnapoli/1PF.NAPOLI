import { Injectable } from '@angular/core';
import { LoginPayload } from '../auth/models';
import { BehaviorSubject, generate } from 'rxjs';
import { User } from '../shared/models/users.model';
import { generateRandomString } from '../shared/utilities/utilities';
import { Router } from '@angular/router';


const FAKE_USERS_DB: User[] = [
  {
  id: generateRandomString(6),
  name: "Agustina",
  email: "email@gmail.com",
  password: "password",
  role: "ADMIN"
  },
  {
    id: generateRandomString(6),
    name: "Sol",
    email: "email@gmail.com",
    password: "password",
    role: "EMPLOYEE"
    }
  ]

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private _authUser$ = new BehaviorSubject< null | User >  (null);

  authUser$ =  this._authUser$.asObservable();

  constructor (private router : Router) {

  }

  login (payload: LoginPayload) : void {

    const loginResult = FAKE_USERS_DB.find(
      (user)=>
        user.email === payload.email && user.password === payload.password
    );

    if (!loginResult)
    {
      alert("EMAIL O PASSWORTD INVALIDOS");
      return;
    }

    this._authUser$.next(loginResult);
    this.router.navigate(['home']);
  }
}
