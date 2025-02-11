import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';

const routes: Routes = [
  { path: '', component: CoursesComponent },  // Ruta por defecto cuando se navega a 'courses'
];

@NgModule({
  imports: [RouterModule.forChild(routes)],  // Usa 'forChild' ya que este es un módulo cargado perezosamente
  exports: [RouterModule]
})
export class CoursesRoutingModule {}
