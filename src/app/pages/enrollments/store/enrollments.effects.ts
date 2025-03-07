import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EnrollmentService } from '../../../core/enrollments.service';
import { CoursesService } from '../../../core/courses.service';
import * as EnrollmentActions from './enrollments.actions';
import { catchError, concatMap, map, mergeMap, of } from 'rxjs';

@Injectable()
export class EnrollmentEffects {
  private actions$ = inject(Actions);
  private enrollmentService = inject(EnrollmentService);
  private coursesService = inject(CoursesService);

  loadEnrollments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EnrollmentActions.loadEnrollments),
      concatMap(() =>
        this.enrollmentService.getEnrollments().pipe(
          mergeMap((enrollments) => this.mapEnrollmentsWithCourses(enrollments)),
          catchError((error) => {
            return of(EnrollmentActions.loadEnrollmentsFailure({ error }));
          })
        )
      )
    );
  });

  private mapEnrollmentsWithCourses(enrollments: any[]) {
    return this.coursesService.getCourses().pipe(
      map((courses) => {
        const enrollmentsWithCourses = enrollments.map((enrollment) => {
          const course = courses.find(c => c.id === enrollment.courseId);
          return {
            ...enrollment,
            courseName: course ? course.name : null
          };
        });
        return EnrollmentActions.loadEnrollmentsSuccess({ enrollments: enrollmentsWithCourses });
      }),
      catchError((error) => {
        return of(EnrollmentActions.loadEnrollmentsFailure({ error }));
      })
    );
  }

  constructor() {

  }
}
