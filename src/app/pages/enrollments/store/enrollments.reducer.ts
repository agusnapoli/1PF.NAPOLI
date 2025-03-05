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
    console.log('Loading enrollments...');
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(EnrollmentActions.loadEnrollmentsSuccess, (state, { enrollments }) => {
    console.log('Enrollments loaded successfully:', enrollments);
    return {
      ...state,
      enrollments,
      error: null,
      isLoading: false,
    };
  }),
  on(EnrollmentActions.loadEnrollmentsFailure, (state, { error }) => {
    console.error('Error loading enrollments:', error);
    return {
      ...state,
      error,
      isLoading: false,
    };
  }),
  on(EnrollmentActions.addEnrollment, (state, { enrollment }) => ({
    ...state,
    enrollments: [...state.enrollments, enrollment],
  }))
);
