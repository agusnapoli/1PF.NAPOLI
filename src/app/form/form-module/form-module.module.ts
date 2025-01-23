import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioComponent } from './formulario/formulario.component';
import {MatFormFieldModule} from '@angular/material/form-field';

import {MatListModule} from '@angular/material/list';

import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    FormularioComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    FormularioComponent
  ]
})
export class FormModuleModule { }
