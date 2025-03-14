import { createReducer, on } from '@ngrx/store';
import { Enrollment } from '../models/enrollment.model';
import * as EnrollmentActions from './enrollments.actions';

export interface EnrollmentState {
  enrollments: Enrollment[];
  error: string | null;
  isLoading: boolean;
}

export const initialState: EnrollmentState = {
  enrollments: [],
  error: null,
  isLoading: false,
};

export const enrollmentsReducer = createReducer(
  initialState,
  on(EnrollmentActions.loadEnrollments, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(EnrollmentActions.loadEnrollmentsSuccess, (state, { enrollments }) => {
    return {
      ...state,
      enrollments,
      error: null,
      isLoading: false,
    };
  }),
  on(EnrollmentActions.loadEnrollmentsFailure, (state, { error }) => {
    return {
      ...state,
      error,
      isLoading: false,
    };
  }),
  on(EnrollmentActions.addEnrollment, (state, { enrollment }) => ({
    ...state,
    enrollments: [...state.enrollments, enrollment],
  })),
  on(EnrollmentActions.deleteEnrollment, (state, { id }) => ({
    ...state,
    enrollments: state.enrollments.filter(enrollment => enrollment.id !== id),
  })),
  on(EnrollmentActions.resetEnrollments, () => initialState) // Acción para restablecer el estado
);
