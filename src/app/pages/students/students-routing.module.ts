import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students.component';

const routes: Routes = [
  { path: '', component: StudentsComponent },  // Ruta por defecto cuando se navega a 'students'
];

@NgModule({
  imports: [RouterModule.forChild(routes)],  // Usa 'forChild' ya que este es un módulo cargado perezosamente
  exports: [RouterModule]
})
export class StudentsRoutingModule {}
