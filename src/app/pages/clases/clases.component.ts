import { Component, OnInit } from '@angular/core';
import { ClasesService, Clase } from './clases.service';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrls: ['./clases.component.scss'],
  standalone: false,
})
export class ClasesComponent implements OnInit {
  clases: Clase[] = []; // Lista de clases
  showForm: boolean = false; // Controla la visibilidad del formulario
  displayedColumns: string[] = ['name', 'acciones']; // Columnas a mostrar en la tabla
  selectedClase: Clase = {id: '', name: ''}; // Clase seleccionada para edición

  constructor(private clasesService: ClasesService) { } // Inyección del servicio

  ngOnInit(): void {
    this.clasesService.getClases().subscribe(data => {
      this.clases = data; // Asignar los datos obtenidos al arreglo de clases
    });
  }

  // Métodos para manejar la lógica de alta, baja y modificación
  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  deleteClase(clase: Clase): void {
    this.clases = this.clases.filter(c => c !== clase);
  }

  editClase(clase: Clase): void {
    this.selectedClase = clase; // Asignar la clase seleccionada
    this.showForm = true; // Mostrar el formulario para editar
  }

  saveClase(clase: Clase): void {
    if (this.selectedClase) {
      const index = this.clases.findIndex(c => c.id === this.selectedClase?.id);
      if (index !== -1) {
        this.clases[index] = { ...this.selectedClase }; // Actualizar la clase en la lista
      }
      this.toggleForm(); // Ocultar el formulario después de guardar
    } else {
      this.clases.push(clase); // Agregar nueva clase si no hay clase seleccionada
      this.toggleForm(); // Ocultar el formulario después de guardar
    }
  }
}
