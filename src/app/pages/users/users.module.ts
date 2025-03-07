import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

import { usersReducer } from './store/users.reducer';
import { UsersEffects } from './store/users.effects';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersDetailsComponent } from './users-details/users-details.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    UsersComponent,
    UsersDetailsComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    StoreModule.forFeature('users', usersReducer),
    EffectsModule.forFeature([UsersEffects]),
    FormsModule,

    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatCardModule
  ],
  exports: [
    UsersComponent,
    UsersDetailsComponent
  ]
})
export class UsersModule { }
