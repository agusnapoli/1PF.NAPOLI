import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Course } from '../../shared/models/courses.model';
import { CoursesService } from '../../core/courses.service';
import { AuthService } from '../../core/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

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
  selectedCourse: Course = { id: '', name: '', description: '', cantidadHoras: 0, cantidadClases: 0, nombreProfesor: '' };


  isAdmin$: Observable<boolean> | undefined;

  constructor(private coursesService: CoursesService, private authService: AuthService) {
    this.isAdmin$ = this.authService.getAuthUser().pipe(map((x)=> x?.role === 'admin'));

  }

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
      this.coursesService.updateCourse(this.selectedCourse.id, course)
        .subscribe(updatedCourse => {
          this.courses = this.courses.map(c =>
            c.id === updatedCourse.id ? updatedCourse : c
          );
        });
    } else {
      this.coursesService.createCourse(course)
        .subscribe(newCourse => {
          this.courses = [...this.courses, newCourse];
        });
    }

    this.selectedCourse = { id: '', name: '', description: '' };
    this.showForm = false;
  }


  displayedColumns: string[] = ['name', 'description', 'actions'];

  deleteCourse(course: Course): void {
    if (!course.id) {
      console.error('Cannot delete course: ID is undefined');
      return;
    }

    this.coursesService.deleteCourse(course.id)
      .subscribe({
        next: () => {
          this.courses = this.courses.filter(c => c.id !== course.id);
        },
        error: (err) => {
          console.error('Error deleting course:', err);
        }
      });
  }



  editCourse(course: Course): void {
    this.selectedCourse = course;
  }
}
