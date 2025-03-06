import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth.service';

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

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.initializeAuth();
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
