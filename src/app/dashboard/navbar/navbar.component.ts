import { Component, EventEmitter, Output, output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: false,

  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  showFiller = false;

  @Output() toggleStudents = new EventEmitter<void>();  // Evento que emite el cambio de estado

  onToggleStudents() {
    this.toggleStudents.emit();  // Emitir el evento para cambiar el estado
  }
}
