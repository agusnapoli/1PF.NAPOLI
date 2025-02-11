import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '1PFNAPOLI';
  showStudents: boolean = false;
  showCourses: boolean = false;
  showClases: boolean = false;

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
