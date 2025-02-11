import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Course } from '../../shared/models/courses.model';
import { CoursesService } from '../../core/courses.service';

@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  showForm: boolean = false;
  @Input() showCourses: boolean = false;
  courses: Course[] = [];
  editingCourseId: string | null = null;
  selectedCourse: Course = { id: '', name: '', description: '' };

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
    if (this.selectedCourse.id) {
      this.courses = this.courses.map(c =>
        c.id === this.selectedCourse.id ? { ...c, ...course } : c
      );
    } else {
      this.courses = [...this.courses, course];
    }

    this.selectedCourse = { id: '', name: '', description: '' };
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
