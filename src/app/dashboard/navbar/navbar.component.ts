import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { MatDrawer } from '@angular/material/sidenav'; // Importar MatDrawer
import { AppStateService } from '../../core/app-state.service'; // Importar el nuevo servicio

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: false,
})
export class NavbarComponent {
  @ViewChild('drawer') drawer!: MatDrawer; // Referencia al mat-drawer
  userName: string | null = null; // Para almacenar el nombre del usuario

  constructor(
    private router: Router,
    private authService: AuthService,
    private appStateService: AppStateService // Inyectar el servicio
  ) {
    // Suscribirse al observable del usuario
    this.appStateService.currentUser$.subscribe(user => {
      this.userName = user ? user.name : null; // Obtener el nombre del usuario
    });
  }

  closeNavbar(): void {
    this.drawer.close(); // Cerrar el navbar
  }

  goToClases(): void {
    this.closeNavbar();
    this.router.navigate(['/clases']);
  }

  goToStudents(): void {
    this.closeNavbar();
    this.router.navigate(['/students']);
  }

  goToCourses(): void {
    this.closeNavbar();
    this.router.navigate(['/courses']);
  }

  goToEnrollments(): void {
    this.closeNavbar();
    this.router.navigate(['/enrollments']);
  }

  goToAuth(): void {
    this.closeNavbar();
    this.router.navigate(['/auth']);
  }

  goToUsers(): void {
    this.closeNavbar();
    this.router.navigate(['/users']);
  }

  isAdmin(): boolean {
    return this.authService.isAdmin(); // Check if the user is an admin
  }

  logout(): void {
    this.authService.logout();
  }
}
