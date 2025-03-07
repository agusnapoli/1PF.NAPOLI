import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { AuthService } from '../../core/auth.service';
import { Student } from '../../shared/models/students.model';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['./enrollments.component.scss'],
  standalone: false,
})
export class EnrollmentsComponent implements OnInit, OnDestroy {
  students: any[] = [];
  currentEnrollmentId: string | null = null;
  isEditing: boolean = false;
  selectedEnrollment: Enrollment | null = null;

  courses: any[] = [];
  enrollments$: Observable<Enrollment[]>;

  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  enrollmentForm: FormGroup;
  isAdmin$: Observable<boolean>;

  constructor(
    private store: Store,
    private studentsService: StudentsService,
    private enrollmentService: EnrollmentService,
    private coursesService: CoursesService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.enrollments$ = this.store.select(selectEnrollments).pipe(
      startWith([]),
      map(enrollments => enrollments || []),
      catchError((error) => {
        return of([]);
      })
    );

    this.isLoading$ = this.store.select(selectIsLoading);
    this.error$ = this.store.select(selectError);
    this.enrollmentForm = this.fb.group({
      studentId: ['', Validators.required],
      courseId: ['', Validators.required]
    });

    this.isAdmin$ = this.authService.getAuthUser().pipe(map((user) => user?.role === 'admin'));
  }

  ngOnInit(): void {
    this.loadStudents();
    this.loadCourses();
    this.store.dispatch(EnrollmentActions.loadEnrollments()); // <- Aquí agregamos los paréntesis
  }


  ngOnDestroy(): void {
    this.store.dispatch(EnrollmentActions.resetEnrollments());
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

  createOrUpdateEnrollment(): void {
    if (this.enrollmentForm.valid) {
      this.authService.getAuthUser().subscribe(user => {
        const enrollment: Enrollment = {
          id: this.currentEnrollmentId || this.generateId(),
          studentId: this.enrollmentForm.value.studentId,
          courseId: this.enrollmentForm.value.courseId,
          enrollmentDate: new Date(),
          userId: user ? user.id : ''
        };

        if (this.currentEnrollmentId) {
          this.enrollmentService.updateEnrollment(enrollment).subscribe({
            next: (updatedEnrollment: Enrollment) => {
              this.store.dispatch(EnrollmentActions.updateEnrollment({ enrollment: updatedEnrollment }));
              this.store.dispatch(EnrollmentActions.loadEnrollments());
              this.updateStudentCourse(enrollment.studentId, enrollment.courseId);
              this.resetForm();
            },
            error: (error: any) => {
            }
          });

        } else {
          this.enrollmentService.addEnrollment(enrollment).subscribe({
            next: (newEnrollment: Enrollment) => {
              this.store.dispatch(EnrollmentActions.addEnrollment({ enrollment: newEnrollment }));
              this.store.dispatch(EnrollmentActions.loadEnrollments());
              this.updateStudentCourse(enrollment.studentId, enrollment.courseId);
              this.resetForm();
            },
            error: (error: any) => {
            }
          });
        }
      });
    }
  }

  updateStudentCourse(studentId: string, courseId: string): void {
    this.studentsService.getStudentById(studentId).subscribe(student => {
      const updatedStudent: Student = {
        ...student,
        courses: student.courses ? [...student.courses, courseId] : [courseId]
      };

      this.studentsService.updateStudent(studentId, updatedStudent).subscribe({
        next: () => {
        },
        error: (error: any) => {
        }
      });
    });
  }

  deleteEnrollment(id: string): void {
    this.enrollmentService.getEnrollmentById(id).subscribe(enrollment => {
      this.selectedEnrollment = enrollment;
      const studentId = enrollment.studentId;

      this.enrollmentService.deleteEnrollment(id).subscribe({
        next: () => {
          this.store.dispatch(EnrollmentActions.deleteEnrollment({ id }));
          this.store.dispatch(EnrollmentActions.loadEnrollments());

          if (studentId) {
            this.studentsService.getStudentById(studentId).subscribe(student => {
              const updatedCourses = (student.courses || []).filter(course => course !== enrollment.courseId);

              const updatedStudent: Student = {
                ...student,
                courses: updatedCourses
              };
              this.studentsService.updateStudent(studentId, updatedStudent).subscribe({
                next: () => {
                },
                error: (error: any) => {
                }
              });
            });
          }
        },
        error: (error: any) => {
        }
      });
    });
  }

  modifyEnrollment(enrollment: Enrollment): void {
    this.selectedEnrollment = enrollment;
    this.currentEnrollmentId = enrollment.id;
    this.isEditing = true;

    this.enrollmentForm.patchValue({
      studentId: enrollment.studentId,
      courseId: enrollment.courseId
    });
  }

  resetForm(): void {
    this.enrollmentForm.reset();
    this.currentEnrollmentId = null;
    this.selectedEnrollment = null;
    this.isEditing = false;
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
