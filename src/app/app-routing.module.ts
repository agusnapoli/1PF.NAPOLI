import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

const routes: Routes = [
  {
    path: 'clases',
    loadChildren: () => import('./pages/clases/clases.module').then(m => m.ClasesModule),
    canActivate: [authGuard]
  },
  {
    path: 'students',
    loadChildren: () => import('./pages/students/students.module').then(m => m.StudentsModule),
    canActivate: [authGuard]

  },
  {
    path: 'courses',
    loadChildren: () => import('./pages/courses/courses.module').then(m => m.CoursesModule),
    canActivate: [authGuard]

  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },

  {
    path: 'users',
    loadChildren: () => import('./pages/users/users.module').then(m=>m.UsersModule),
    canActivate: [authGuard, adminGuard]
  },

  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  {path: '**', redirectTo:'/auth', pathMatch: 'full'}

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
