import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card'; // Importar MatCardModule

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule.forChild([  // Esta es la clave
      { path: '', component: HomeComponent }
    ]),
  ],
  exports : [
    HomeComponent
  ]
})
export class HomeModule { }
