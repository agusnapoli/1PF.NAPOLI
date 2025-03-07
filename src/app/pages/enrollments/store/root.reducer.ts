import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { enrollmentsReducer, EnrollmentState } from './enrollments.reducer';
import { Enrollment } from '../models/enrollment.model';

export interface RootState {
  enrollments: EnrollmentState;
}


export const rootReducer: ActionReducerMap<RootState> = {
  enrollments: enrollmentsReducer,
};
