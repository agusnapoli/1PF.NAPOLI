
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field'; // Import MatFormFieldModule
import { MatInputModule } from '@angular/material/input'; // Import MatInputModule
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { MatIcon } from '@angular/material/icon';

@NgModule({
  declarations: [
    CoursesComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule, // Add MatFormFieldModule to imports
    MatInputModule, // Add MatInputModule to imports
    FormsModule, // Add FormsModule to imports
    SharedModule,
    MatIcon
  ],
  exports: [
    CoursesComponent
  ]
})
export class CoursesModule { }
