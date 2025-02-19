import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClasesComponent } from './clases.component';
import { ClaseDetailComponent } from './clase-detail/clase-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ClasesComponent,
    children: [
      { path: 'detail/:id', component: ClaseDetailComponent }
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClasesRoutingModule {}
