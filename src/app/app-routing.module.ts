import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Configuración de rutas
const routes: Routes = [
  {
    path: 'clases',
    loadChildren: () => import('./pages/clases/clases.module').then(m => m.ClasesModule)  // Lazy Loading para Clases
  },
  {
    path: 'students',
    loadChildren: () => import('./pages/students/students.module').then(m => m.StudentsModule)  // Lazy Loading para Students
  },
  {
    path: 'courses',
    loadChildren: () => import('./pages/courses/courses.module').then(m => m.CoursesModule)  // Lazy Loading para Courses
  },
  {
    path: '',
    redirectTo: '/courses',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
