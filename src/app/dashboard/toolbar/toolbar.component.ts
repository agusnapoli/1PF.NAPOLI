import { Component, EventEmitter, Output } from '@angular/core';
import { AppStateService } from '../../core/app-state.service'; // Importar el servicio
import { User } from '../../shared/models/users.model'; // Importar el modelo de usuario
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  standalone: false,
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Output() drawerT = new EventEmitter();

  userName: string | null = null; // Para almacenar el nombre del usuario
  title: string = 'Administración'; // Título general

  constructor(private appStateService: AppStateService) {
    this.appStateService.currentUser$.subscribe(user => {
      this.userName = user ? user.name : null; // Obtener el nombre del usuario
    });

    this.appStateService.currentTitle$.subscribe(title => {
      this.title = title; // Obtener el título del componente
    });
  }

}
