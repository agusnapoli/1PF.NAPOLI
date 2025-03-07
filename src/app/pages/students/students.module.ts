import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsComponent } from './students.component';
import { StudentsDetailsComponent } from './pages/students-details/students-details.component';
import { StudentsRoutingModule } from './students-routing.module';

import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FormModuleModule } from '../../form/form-module/form-module.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    StudentsComponent,
    StudentsDetailsComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    SharedModule,
    FormModuleModule,

    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  exports: [
    StudentsComponent,
    StudentsDetailsComponent
  ]
})
export class StudentsModule { }
