import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router'; // Importar Router

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  showFiller = false;

  @Output() toggleStudents = new EventEmitter<void>();  // Evento que emite el cambio de estado
  @Output() toggleCourses = new EventEmitter<void>();  // Evento para alternar cursos
  @Output() toggleClases = new EventEmitter<void>();  // Evento para alternar clases

  constructor(private router: Router) {} // Inyectar Router

  onToggleStudents() {
    this.toggleStudents.emit();
  }

  onToggleCourses() {
    this.toggleCourses.emit();
  }
  onToggleClases() {
    this.toggleClases.emit();

  }


  navigateToClases() {
    this.toggleClases.emit(); // Emitir evento para alternar la visibilidad del componente Clases
  }
}
