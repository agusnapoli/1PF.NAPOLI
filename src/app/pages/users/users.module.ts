import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store'; // Importar StoreModule
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { usersReducer } from './store/users.reducer'; // Importar el reducer
import { UsersEffects } from './store/users.effects';
import { EffectsModule } from '@ngrx/effects';



@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    StoreModule.forFeature('users', usersReducer),
    EffectsModule.forFeature([UsersEffects]),
  ],
  exports: [
    UsersComponent
  ]
})
export class UsersModule { }
