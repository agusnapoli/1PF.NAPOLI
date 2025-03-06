import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth.service';
import { AppStateService } from './core/app-state.service'; // Importar el servicio de estado
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  title = '1PFNAPOLI';
  showStudents: boolean = false;
  showCourses: boolean = false;
  showClases: boolean = false;

  constructor(private authService: AuthService, private appStateService: AppStateService, private router: Router) {}

  ngOnInit() {
    this.authService.initializeAuth();

    // Establecer el título según la ruta
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const currentRoute = this.router.routerState.snapshot.root;
      const title = currentRoute.data['title'] || 'Administración'; // Obtener el título de la ruta
      this.appStateService.setCurrentTitle(title); // Establecer el título en el estado
    });
  }

  toggleStudents() {
    this.showStudents = !this.showStudents;
    this.showCourses = false;
    this.showClases = false;
  }

  toggleCourses() {
    this.showCourses = !this.showCourses;
    this.showStudents = false;
    this.showClases = false;
  }

  toggleClases() {
    this.showClases = !this.showClases;
    this.showStudents = false;
    this.showCourses = false;
  }

}
