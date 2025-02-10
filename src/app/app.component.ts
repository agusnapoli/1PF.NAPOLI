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
    if (this.showStudents) this.showCourses = false; // Asegura que solo uno esté visible a la vez
  }

  toggleCourses() {
    this.showCourses = !this.showCourses;
    if (this.showCourses) this.showStudents = false; // Asegura que solo uno esté visible a la vez
  }
}
