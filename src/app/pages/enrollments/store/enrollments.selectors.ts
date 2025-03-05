import { createSelector, createFeatureSelector } from '@ngrx/store';
import { EnrollmentState } from './enrollments.reducer';

export const selectEnrollmentsState = createFeatureSelector<EnrollmentState>('enrollments');

export const selectEnrollments = createSelector(
  selectEnrollmentsState,
  (state) => state.enrollments
);

export const selectIsLoading = createSelector(
  selectEnrollmentsState,
  (state) => state.isLoading
);

export const selectError = createSelector(
  selectEnrollmentsState,
  (state) => state.error
);
