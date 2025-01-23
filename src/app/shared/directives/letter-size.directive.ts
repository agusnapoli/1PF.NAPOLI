import { Directive, ElementRef, inject, OnInit } from '@angular/core';

@Directive({
  selector: '[appLetterSize]',
  standalone: false
})
export class LetterSizeDirective implements OnInit  {

  constructor( private el: ElementRef) {
   }

   ngOnInit(): void {
    this.el.nativeElement.style.fontSize = '20px';

   }

}
