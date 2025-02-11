import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClasesComponent } from './pages/clases/clases.component'; // Importar el componente Clases

const routes: Routes = [
  { path: 'clases', component: ClasesComponent }, // Ruta para el componente Clases
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
