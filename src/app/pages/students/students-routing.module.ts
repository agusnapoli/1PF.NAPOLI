import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students.component';
import { StudentsDetailsComponent } from './pages/students-details/students-details.component';

const routes: Routes = [
  { path: '', component: StudentsComponent },
  { path: ':id', component: StudentsDetailsComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule {}
