import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Clase {
  id: string;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClasesService {
  private clases: Clase[] = [
    { id: '1', name: 'Matemáticas', description: 'Clase de matemáticas' },
    { id: '2', name: 'Historia', description: 'Clase de historia' },
    { id: '3', name: 'Ciencias', description: 'Clase de ciencias' }
  ];

  constructor() { }

  // Método que devuelve un observable con las clases
  getClases(): Observable<Clase[]> {
    return of(this.clases);
  }

  // Método para agregar una nueva clase
  addClase(clase: Clase): void {
    this.clases.push(clase);
  }

  // Método para actualizar una clase existente
  updateClase(updatedClase: Clase): void {
    const index = this.clases.findIndex(clase => clase.id === updatedClase.id);
    if (index !== -1) {
      this.clases[index] = updatedClase;
    }
  }

  // Método para eliminar una clase por su ID
  deleteClase(claseId: string): void {
    this.clases = this.clases.filter(clase => clase.id !== claseId);
  }
}
