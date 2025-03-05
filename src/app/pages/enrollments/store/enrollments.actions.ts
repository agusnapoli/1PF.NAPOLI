import { createAction, props } from '@ngrx/store';
import { Enrollment } from '../models/enrollment.model';

export const loadEnrollments = createAction('[Enrollments] Load Enrollments');
export const addEnrollment = createAction(
  '[Enrollments] Add Enrollment',
  props<{ enrollment: Enrollment }>()
);
export const loadEnrollmentsSuccess = createAction(
  '[Enrollments] Load Enrollments Success',
  props<{ enrollments: Enrollment[] }>()
);
export const loadEnrollmentsFailure = createAction(
  '[Enrollments] Load Enrollments Failure',
  props<{ error: any }>()
);
