import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioComponent } from './formulario/formulario.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';


import {MatListModule} from '@angular/material/list';

import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    FormularioComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatListModule,
    MatIconModule, // Agregar el módulo de iconos a las importaciones

    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    SharedModule,
    MatSelectModule
  ],
  exports: [
    FormularioComponent
  ]
})
export class FormModuleModule { }
