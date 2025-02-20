import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClasesComponent } from './clases.component';
import { ClaseDetailComponent } from './clase-detail/clase-detail.component';
import { AuthGuard } from '../../core/guards/auth.guard';


const routes: Routes = [
  { path: '', component: ClasesComponent },
  {
    path: ':id',
    component: ClaseDetailComponent,
    canActivate: [AuthGuard]

  },
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClasesRoutingModule {}
