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

  constructor() { }

  // Método que devuelve un observable con datos mockeados
  getClases(): Observable<Clase[]> {
    const mockClases: Clase[] = [
      { id: '1', name: 'Matemáticas', description: 'Clase de matemáticas' },
      { id: '2', name: 'Historia', description: 'Clase de historia' },
      { id: '3', name: 'Ciencias', description: 'Clase de ciencias' }
    ];
    return of(mockClases); // Devuelve un observable con los datos mockeados
  }
}
