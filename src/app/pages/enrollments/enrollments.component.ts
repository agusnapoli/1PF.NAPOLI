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
import { Student } from '../../shared/models/students.model'; // Importar el modelo de estudiante

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['./enrollments.component.scss'],
  standalone: false,
})
export class EnrollmentsComponent implements OnInit, OnDestroy {
  students: any[] = [];
  currentEnrollmentId: string | null = null; // To track the ID of the enrollment being edited
  isEditing: boolean = false; // To track if we are in editing mode
  selectedEnrollment: Enrollment | null = null; // Track the enrollment being edited

  courses: any[] = [];
  enrollments$: Observable<Enrollment[]>;

  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  enrollmentForm: FormGroup;
  isAdmin$: Observable<boolean>; // Check if the user is an admin

  constructor(
    private store: Store,
    private studentsService: StudentsService,
    private enrollmentService: EnrollmentService,
    private coursesService: CoursesService,
    private fb: FormBuilder,
    private authService: AuthService // Inject AuthService
  ) {
    this.enrollments$ = this.store.select(selectEnrollments).pipe(
      startWith([]),
      map(enrollments => enrollments || []),
      catchError((error) => {
        console.error('Error loading enrollments:', error);
        return of([]); // Return an empty array in case of error
      })
    );

    this.isLoading$ = this.store.select(selectIsLoading);
    this.error$ = this.store.select(selectError);
    this.enrollmentForm = this.fb.group({
      studentId: ['', Validators.required],
      courseId: ['', Validators.required]
    });

    // Check if the user is an admin
    this.isAdmin$ = this.authService.getAuthUser().pipe(map((user) => user?.role === 'admin'));
  }

  ngOnInit(): void {
    this.loadStudents();
    this.loadCourses();
    this.store.dispatch(EnrollmentActions.loadEnrollments());
  }

  ngOnDestroy(): void {
    this.store.dispatch(EnrollmentActions.resetEnrollments()); // Action to reset the state
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
          id: this.currentEnrollmentId || this.generateId(), // Usa el ID existente si está en edición

          studentId: this.enrollmentForm.value.studentId,
        courseId: this.enrollmentForm.value.courseId, // Mantener solo el ID del curso


          enrollmentDate: new Date(), // Set the current date as enrollment date
          userId: user ? user.id : '' // Asignar el ID del usuario autenticado o una cadena vacía
        };

        if (this.currentEnrollmentId) {
          // Modo edición: actualizar inscripción existente
          console.log('Updating enrollment:', enrollment); // Debugging

          this.enrollmentService.updateEnrollment(enrollment).subscribe({
            next: (updatedEnrollment: Enrollment) => {
              this.store.dispatch(EnrollmentActions.updateEnrollment({ enrollment: updatedEnrollment }));
              this.store.dispatch(EnrollmentActions.loadEnrollments()); // Recargar inscripciones después de actualizar
              this.updateStudentCourse(enrollment.studentId, enrollment.courseId); // Actualizar el curso del estudiante
              this.resetForm(); // Resetear formulario
            },
            error: (error: any) => {
              console.error('Error updating enrollment:', error);
            }
          });

        } else {
          // Modo creación: agregar una nueva inscripción
          console.log('Adding new enrollment:', enrollment); // Debugging

          this.enrollmentService.addEnrollment(enrollment).subscribe({
            next: (newEnrollment: Enrollment) => {
              this.store.dispatch(EnrollmentActions.addEnrollment({ enrollment: newEnrollment }));
              this.store.dispatch(EnrollmentActions.loadEnrollments()); // Recargar inscripciones después de agregar
              this.updateStudentCourse(enrollment.studentId, enrollment.courseId); // Actualizar el curso del estudiante
              this.resetForm(); // Resetear formulario
            },
            error: (error: any) => {
              console.error('Error adding enrollment:', error);
            }
          });
        }
      });
    }
  }

  updateStudentCourse(studentId: string, courseId: string): void {
    this.studentsService.getStudentById(studentId).subscribe(student => {
      // Actualizar el objeto del estudiante con el nuevo curso
        const updatedStudent: Student = {
          ...student,
          courses: student.courses ? [...student.courses, courseId] : [courseId] // Agregar el nuevo curso al array de cursos, inicializar si es necesario


      };

        this.studentsService.updateStudent(studentId, updatedStudent).subscribe({
          // Actualizar el estudiante con el nuevo curso

        next: () => {
          console.log('Student updated with new course:', updatedStudent);
        },
        error: (error: any) => {
          console.error('Error updating student:', error);
        }
      });
    });
  }

  deleteEnrollment(id: string): void {
    this.enrollmentService.deleteEnrollment(id).subscribe({
        next: () => {
            this.store.dispatch(EnrollmentActions.deleteEnrollment({ id }));
            this.store.dispatch(EnrollmentActions.loadEnrollments()); // Reload enrollments after deletion
        },
        error: (error: any) => {
            console.error('Error deleting enrollment:', error);
        }
    });
  }

  modifyEnrollment(enrollment: Enrollment): void {
    console.log('Editing enrollment:', enrollment); // Log para verificar datos

    this.selectedEnrollment = enrollment;
    this.currentEnrollmentId = enrollment.id;
    this.isEditing = true;

    this.enrollmentForm.patchValue({
      studentId: enrollment.studentId,
      courseId: enrollment.courseId
    });

    console.log('Form values after patch:', this.enrollmentForm.value); // Debugging
  }

  resetForm(): void {
    this.enrollmentForm.reset();
    this.currentEnrollmentId = null; // Clear the current enrollment ID
    this.selectedEnrollment = null; // Clear the selected enrollment
    this.isEditing = false; // Reset editing flag
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
