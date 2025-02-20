import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClasesComponent } from './clases.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ClasesRoutingModule } from './clases-routing.module';
import { ClaseDetailComponent } from './clase-detail/clase-detail.component';
import { Clase } from '../../shared/models/clase.model';


@NgModule({
  declarations: [ClasesComponent, ClaseDetailComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ClasesRoutingModule

  ],
  exports: [ClasesComponent, ClaseDetailComponent]
})
export class ClasesModule { }
