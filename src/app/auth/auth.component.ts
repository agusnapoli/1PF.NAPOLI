import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  standalone: false
})
export class AuthComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        // Verificar si el usuario está autenticado antes de redirigir
        if (this.authService.isAuthenticated()) {
          this.router.navigate(['/home']);
        } else { // ✅ ELSE correctamente ubicado
          this.errorMessage = 'Error al autenticar el usuario.';
        }
      },
      error: (err) => {
        this.errorMessage = 'Credenciales incorrectas';
        console.error('Login error:', err);
      }
    });
  }
}
