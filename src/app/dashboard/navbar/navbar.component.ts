import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: false,

})
export class NavbarComponent {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  goToClases(): void {
    this.router.navigate(['/clases']);
  }

  goToStudents(): void {
    this.router.navigate(['/students']);
  }

  goToCourses(): void {
    this.router.navigate(['/courses']);
  }

  goToAuth(): void {
    this.router.navigate(['/auth']);
  }




  logout(): void {
    this.authService.logout();
  }
}
