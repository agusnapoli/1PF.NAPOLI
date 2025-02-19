import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './dashboard/navbar/navbar.component';
import { ModulesModule } from './dashboard/modules/modules.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './pages/users/users.module';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule ,
    ModulesModule,
    AuthModule,
    UsersModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
