import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EnrollmentService } from '../enrollments.service';
import { Observable } from 'rxjs';
import { Enrollment } from '../models/enrollment.model';
import * as EnrollmentActions from './enrollments.actions';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CoursesService } from '../../../core/courses.service';
@Injectable()
export class EnrollmentEffects {
  private actions$ = inject(Actions);
  private coursesService = inject(CoursesService);

  loadEnrollments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EnrollmentActions.loadEnrollments),
      concatMap(() =>
        this.enrollmentService.getEnrollments().pipe(
          mergeMap((enrollments) =>
            this.coursesService.getCourses().pipe(
              map((courses) => {
                // Combinar inscripciones con cursos
                const enrollmentsWithCourses = enrollments.map((enrollment) => {
                  const course = courses.find(c => c.id === enrollment.courseId);
                  return {
                    ...enrollment,
                    courseName: course ? course.name : null // Agregar el nombre del curso
                  };
                });
                return EnrollmentActions.loadEnrollmentsSuccess({ enrollments: enrollmentsWithCourses });
              }),
              catchError((error) =>
                of(EnrollmentActions.loadEnrollmentsFailure({ error }))
              )
            )
          ),
          catchError((error) =>
            of(EnrollmentActions.loadEnrollmentsFailure({ error }))
          )
        )
      )
    );
  });

  constructor(private enrollmentService: EnrollmentService) {
    console.log('EnrollmentEffects initialized'); // Debug log
  }
}
