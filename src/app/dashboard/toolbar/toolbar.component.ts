import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { AppStateService } from '../../core/app-state.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: false,
})
export class ToolbarComponent implements OnInit {
  title: string = '';
  userName: string | null = null;
  showMessage: boolean = false; // Para controlar la visibilidad del mensaje flotante
  message: string = ''; // Mensaje flotante

  @Output() drawerT = new EventEmitter<void>(); // Evento para abrir la navbar

  constructor(private authService: AuthService, private appStateService: AppStateService) {}

  ngOnInit() {
    this.appStateService.currentUser$.subscribe(user => {
      this.userName = user ? user.name : null; // Obtener el nombre del usuario
    });

    this.appStateService.currentTitle$.subscribe(title => {
      this.title = title ; // Obtener el título del componente
    });
  }

  openDrawer(): void {
    if (!this.userName) {
      this.showMessage = true; // Mostrar el mensaje
      this.message = "Para continuar por favor inicie sesión"; // Establecer el mensaje
      setTimeout(() => {
        this.showMessage = false; // Ocultar el mensaje después de 3 segundos
      }, 3000);
    } else {
      this.drawerT.emit(); // Emitir el evento para abrir la navbar
    }
  }
}
