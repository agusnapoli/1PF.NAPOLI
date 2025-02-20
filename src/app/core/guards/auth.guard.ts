import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.isAuthenticated()) {
      return this.router.createUrlTree(['/auth']);
    }

    // Si el usuario es employee y trata de acceder a /auth o /users, redirigir a home
    if (this.authService.isEmployee() &&
        (state.url.startsWith('/auth') || state.url.startsWith('/users'))) {
      return this.router.createUrlTree(['/home']);
    }

    return true;
  }
}
