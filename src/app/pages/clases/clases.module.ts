import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClasesComponent } from './clases.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ClasesRoutingModule } from './clases-routing.module';
import { ClaseDetailComponent } from './clase-detail/clase-detail.component';

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
    ClasesRoutingModule
  ],
  exports: [ClasesComponent]
})
export class ClasesModule { }
