import { Component, Input, OnInit } from '@angular/core';
import { ClasesService, Clase } from './clases.service';
import { ChangeDetectorRef } from '@angular/core';

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
  selectedClase: Clase = {id: '', name: '', description: ''}; // Clase seleccionada para edición

  @Input() showClases: boolean = false; // Recibe el estado desde el componente padre

  constructor(private clasesService: ClasesService, private cdr: ChangeDetectorRef) { } // Inyección del servicio

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
  }saveClase(clase: Clase): void {
    if (this.selectedClase.id) {
      const index = this.clases.findIndex(c => c.id === this.selectedClase.id);
      if (index !== -1) {
        // Usamos inmutabilidad para asegurarnos de que Angular detecte el cambio
        this.clases = [
          ...this.clases.slice(0, index),
          { ...this.selectedClase },
          ...this.clases.slice(index + 1)
        ];
      }
    } else {
      const newClase: Clase = { ...clase, id: new Date().toISOString() };
      this.clases = [...this.clases, newClase]; // Crear un nuevo array con la nueva clase
    }

    this.selectedClase = { id: '', name: '', description: '' }; // Reiniciar la clase seleccionada
    this.showForm = true; // Mantener el formulario abierto

    console.log(this.clases);
  }
}
