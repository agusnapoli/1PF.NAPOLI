import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Clase {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClasesService {
  private clases: Clase[] = [
    { id: '1', name: 'Matemáticas' },
    { id: '2', name: 'Historia' },
    { id: '3', name: 'Ciencias' }
  ];

  constructor() { }

  getClases(): Observable<Clase[]> {
    return of(this.clases); // Devuelve un observable con los datos mockeados
  }
}
