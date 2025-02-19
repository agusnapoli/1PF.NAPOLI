import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CanActivateFn } from '@angular/router';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.isAutenticated().pipe(
    map((isAuthenticated) => {
      if (!isAuthenticated) {
        // Si no está autenticado, redirige al login
        return router.createUrlTree(['auth']);
      }
      // Si está autenticado, permite la navegación
      return true;
    })
  );
};
