import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  showFiller = false;

  @Output() toggleStudents = new EventEmitter<void>();  // Evento que emite el cambio de estado
  @Output() toggleCourses = new EventEmitter<void>();  // Evento para alternar cursos

  onToggleStudents() {
    this.toggleStudents.emit();
  }

  onToggleCourses() {
    this.toggleCourses.emit();
  }
}
