import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursesModule } from './pages/courses/courses.module'; // Import CoursesModule
import { ModulesModule } from './dashboard/modules/modules.module';
import { StudentsModule } from './pages/students/students.module';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ClasesModule } from "./pages/clases/clases.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModulesModule,
    StudentsModule,
    CoursesModule // Se mantiene en imports
    ,
    ClasesModule
],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
