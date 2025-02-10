import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.scss']  // Aquí debe ser styleUrls, no styleUrl
})
export class AppComponent {
  title = '1PFNAPOLI';
  showStudents: boolean = false;  // Esta variable controla si el componente Students se muestra
  showCourses: boolean = false; // Esta variable controla si el componente Courses se muestra

  toggleStudents() {
    this.showStudents = !this.showStudents;
    this.showCourses = false; // Desactivar la vista de cursos cuando se muestran estudiantes
  }

  // Método para alternar la visibilidad de cursos
  toggleCourses() {
    this.showCourses = !this.showCourses;
    this.showStudents = false; // Desactivar la vista de estudiantes cuando se muestran cursos
  }
}
