import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { enrollmentsReducer, EnrollmentState } from './enrollments.reducer';
import { Enrollment } from '../models/enrollment.model';

// Definir el estado global de la aplicación
export interface RootState {
  enrollments: EnrollmentState; // Ahora usa la interfaz correcta
}

// Reducer principal
export const rootReducer: ActionReducerMap<RootState> = {
  enrollments: enrollmentsReducer,
};
