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
  showCourses: boolean = true; // Esta variable controla si el componente Courses se muestra


  // Método para cambiar el estado de showStudents
  toggleStudents() {
    this.showStudents = !this.showStudents; // Cambia el valor de showStudents al hacer clic
  }
}
