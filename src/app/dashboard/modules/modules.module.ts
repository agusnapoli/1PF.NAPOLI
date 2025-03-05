import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { NavbarComponent } from '../navbar/navbar.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { StudentsModule } from '../../pages/students/students.module';
import { SharedModule } from '../../shared/shared.module';
import { CoursesModule } from '../../pages/courses/courses.module';
import { ClasesModule } from '../../pages/clases/clases.module';
import { EnrollmentsModule } from '../../pages/enrollments/enrollments.module';


@NgModule({
  declarations: [
    NavbarComponent,
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    SharedModule,
  ],
  exports: [
    NavbarComponent,
    ToolbarComponent
  ]
})
export class ModulesModule { }
