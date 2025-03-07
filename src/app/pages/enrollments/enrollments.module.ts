import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// Import Angular Material modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table'; // Import MatTableModule

import { EnrollmentsRoutingModule } from './enrollments-routing.module';
import { EnrollmentsComponent } from './enrollments.component';
import { EnrollmentService } from '../../core/enrollments.service';
import { enrollmentsReducer } from './store/enrollments.reducer';
import { EnrollmentEffects } from './store/enrollments.effects';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    EnrollmentsComponent
  ],
  providers: [EnrollmentService],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    EnrollmentsRoutingModule,
    StoreModule.forFeature('enrollments', enrollmentsReducer),
    EffectsModule.forFeature([EnrollmentEffects]),
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatButton,
    MatIcon,
    MatButtonModule

  ],
  exports: [
    EnrollmentsComponent
  ]
})
export class EnrollmentsModule { }
