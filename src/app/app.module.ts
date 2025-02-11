import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';  // Mantén el enrutamiento
import { NavbarComponent } from './dashboard/navbar/navbar.component';
import { ModulesModule } from './dashboard/modules/modules.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule ,
    ModulesModule // Importa el módulo de enrutamiento
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
