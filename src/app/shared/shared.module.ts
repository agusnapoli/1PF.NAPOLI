import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NameAndLastnamePipe } from './pipe/name-and-lastname.pipe';
import { LetterSizeDirective } from './directives/letter-size.directive';



@NgModule({
  declarations: [
    NameAndLastnamePipe,
    LetterSizeDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NameAndLastnamePipe,
    LetterSizeDirective
  ]
})
export class SharedModule { }
