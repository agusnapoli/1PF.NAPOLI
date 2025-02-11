import { ChangeDetectorRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsComponent } from './students.component';

import {MatButtonModule} from '@angular/material/button';
import { FormModuleModule } from '../../form/form-module/form-module.module';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { SharedModule } from '../../shared/shared.module';
import { StudentsRoutingModule } from './students-routing.module';


@NgModule({
  declarations: [
    StudentsComponent,

  ],
  imports: [
    CommonModule,
    MatButtonModule,
    FormModuleModule,
    MatTableModule,
    MatIcon,
    FormModuleModule,
    SharedModule,
    StudentsRoutingModule

  ],
  exports : [
    StudentsComponent
  ]
})
export class StudentsModule { }
