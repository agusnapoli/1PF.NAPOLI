import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClasesComponent } from './clases.component';  // Importa el componente que quieres mostrar

const routes: Routes = [
  { path: '', component: ClasesComponent },  // Ruta por defecto cuando se navega a 'clases'
];

@NgModule({
  imports: [RouterModule.forChild(routes)],  // Usa 'forChild' ya que este es un módulo cargado perezosamente
  exports: [RouterModule]
})
export class ClasesRoutingModule {}
