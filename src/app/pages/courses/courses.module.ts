
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesDetailsComponent } from './pages/courses-details/courses-details.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // MatSpinner
import { MatListModule } from '@angular/material/list'; // MatList
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    CoursesComponent,
    CoursesDetailsComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    SharedModule,
    MatIcon,
    CoursesRoutingModule,
    MatProgressSpinnerModule,
    MatListModule,
    HttpClientModule,
    MatCardModule

  ],
  exports: [
    CoursesComponent,
    CoursesDetailsComponent
  ]
})
export class CoursesModule { }
