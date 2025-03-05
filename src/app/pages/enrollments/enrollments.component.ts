import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Enrollment } from './models/enrollment.model';
import * as EnrollmentActions from './store/enrollments.actions';
import { StudentsService } from '../../core/students.service';
import { CoursesService } from '../../core/courses.service';
import { EnrollmentService } from './enrollments.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { selectError, selectIsLoading, selectEnrollments } from './store/enrollments.selectors';
import { map, startWith, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['./enrollments.component.scss'],
  standalone: false,
})
export class EnrollmentsComponent implements OnInit {
  students: any[] = [];
  courses: any[] = [];
  enrollments$: Observable<Enrollment[]>;

  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  enrollmentForm: FormGroup;

  constructor(
    private store: Store,
    private studentsService: StudentsService,
    private enrollmentService: EnrollmentService,
    private coursesService: CoursesService,
    private fb: FormBuilder
  ) {
    this.enrollments$ = this.store.select(selectEnrollments).pipe(
      startWith([]),
      map(enrollments => enrollments || []),
      catchError((error) => {
        console.error('Error loading enrollments:', error);
        return of([]); // Retornar un arreglo vacío en caso de error
      })
    );

    this.isLoading$ = this.store.select(selectIsLoading);
    this.error$ = this.store.select(selectError);
    this.enrollmentForm = this.fb.group({
      studentId: ['', Validators.required],
      courseId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadStudents();
    this.loadCourses();
    this.store.dispatch(EnrollmentActions.loadEnrollments());
  }

  loadStudents(): void {
    this.studentsService.getStudents().subscribe((students: any[]) => {
      this.students = students;
    });
  }

  loadCourses(): void {
    this.coursesService.getCourses().subscribe((courses: any[]) => {
      this.courses = courses;
    });
  }

  createEnrollment(): void {
    if (this.enrollmentForm.valid) {
      const newEnrollment: Enrollment = {
        id: this.generateId(),
        studentId: this.enrollmentForm.value.studentId,
        courseId: this.enrollmentForm.value.courseId
      };

      this.enrollmentService.addEnrollment(newEnrollment).subscribe({
        next: (enrollment: Enrollment) => {
          this.store.dispatch(EnrollmentActions.addEnrollment({ enrollment }));
        },
        error: (error: any) => {
          console.error('Error adding enrollment:', error);
        }
      });
    }
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
