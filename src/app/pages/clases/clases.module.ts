import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClasesComponent } from './clases.component'; // Importar el componente
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon'; // Importar MatIconModule
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field'; // Importar MatFormFieldModule
import { MatInputModule } from '@angular/material/input'; // Importar MatInputModule
import { ClasesRoutingModule } from './clases-routing.module';

@NgModule({
  declarations: [ClasesComponent], // Declarar el componente aquí
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule, // Agregar MatIconModule a las importaciones
    FormsModule,
    MatFormFieldModule, // Agregar MatFormFieldModule a las importaciones
    MatInputModule,
    ClasesRoutingModule// Agregar MatInputModule a las importaciones
  ],
  exports: [ClasesComponent] // Exportar el componente
})
export class ClasesModule { }
