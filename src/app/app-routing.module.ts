import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

import { AdminGuard } from './core/guards/admin.guard';
import { EnrollmentsModule } from './pages/enrollments/enrollments.module';


const routes: Routes = [
  {
    path: 'clases',
    loadChildren: () => import('./pages/clases/clases.module').then(m => m.ClasesModule),
    canActivate: [AuthGuard],
    data: { title: 'Clases' } // Título para la ruta
  },
  {
    path: 'students',
    loadChildren: () => import('./pages/students/students.module').then(m => m.StudentsModule),
    canActivate: [AuthGuard],
    data: { title: 'Estudiantes' } // Título para la ruta
  },
  {
    path: 'courses',
    loadChildren: () => import('./pages/courses/courses.module').then(m => m.CoursesModule),
    canActivate: [AuthGuard],
    data: { title: 'Cursos' } // Título para la ruta
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    data: { title: 'Inicio' } // Título para la ruta
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    // Título para la ruta
  },
  {
    path: 'enrollments',
    loadChildren: () => import('./pages/enrollments/enrollments.module').then(m=> m.EnrollmentsModule),
    canActivate: [AuthGuard],
    data: { title: 'Inscripciones' } // Título para la ruta
  },
  {
    path: 'users',
    loadChildren: ()=> import('./pages/users/users.module').then(m=> m.UsersModule),
    canActivate: [AuthGuard],
    data: { title: 'Usuarios' } // Título para la ruta
  },
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  {path: '**', redirectTo:'/home', pathMatch: 'full'}
];





@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
