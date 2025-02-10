import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Course } from '../../shared/models/courses.model';
import { CoursesService } from './courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  standalone: false,
})
export class CoursesComponent implements OnInit {
  showForm: boolean = false;
  @Input() showCourses: boolean = false;
  courses: Course[] = [];
  editingCourseId: string | null = null;
  selectedCourse: Course | null = null;

  constructor(private coursesService: CoursesService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.coursesService.getCourses().subscribe(courses => {
      this.courses = courses;
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  addCourse(course: Course): void {
    if (this.selectedCourse) {
      this.courses = this.courses.map(c =>
        c === this.selectedCourse ? { ...c, ...course } : c
      );
    } else {
      this.courses = [...this.courses, course];
    }

    this.selectedCourse = null;
    console.log(this.courses);
  }

  displayedColumns: string[] = ['name', 'description', 'actions'];

  deleteCourse(course: Course): void {
    this.courses = this.courses.filter(c => c !== course);
  }

  editCourse(course: Course): void {
    this.selectedCourse = course;
  }
}
