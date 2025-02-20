import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { CoursesDetailsComponent } from './pages/courses-details/courses-details.component';
import { AuthGuard } from '../../core/guards/auth.guard';


const routes: Routes = [
  { path: '', component: CoursesComponent },
  {
    path: ':id',
    component: CoursesDetailsComponent,
    canActivate: [AuthGuard]


  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule {}
